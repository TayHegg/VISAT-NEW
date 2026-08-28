/* snat-voice/voice-dictation.js
 * Integração Vanilla JS para o formulário #mainForm do SNAT.
 * O módulo usa data-k como chave canônica, exatamente como o app.js atual.
 */
(function (global) {
  'use strict';

  const SpeechRecognition = global.SpeechRecognition || global.webkitSpeechRecognition;
  const API_URL = '/api/extract-form-fields';

  function normalize(text) {
    return String(text || '').trim().replace(/\s+/g, ' ');
  }

  function getFormSchema(form) {
    return [...form.querySelectorAll('[data-k]')].map((input) => {
      const field = input.closest('.field');
      const label = field?.querySelector('label')?.textContent?.replace(/\s+/g, ' ').trim() || input.dataset.k;
      const options = input.tagName === 'SELECT'
        ? [...input.options].filter((option) => option.value).map((option) => ({ value: option.value, label: option.textContent.trim() }))
        : undefined;
      return {
        key: input.dataset.k,
        label,
        type: input.type || input.tagName.toLowerCase(),
        options,
      };
    });
  }

  function parseDate(value) {
    const text = normalize(value).toLowerCase();
    if (!text) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
    const numeric = text.match(/^(\d{1,2})[\\/-](\d{1,2})[\\/-](\d{4})$/);
    if (numeric) return `${numeric[3]}-${numeric[2].padStart(2, '0')}-${numeric[1].padStart(2, '0')}`;
    return value;
  }

  function setField(key, value, form) {
    const input = form.querySelector(`[data-k="${CSS.escape(key)}"]`);
    if (!input || value === null || value === undefined || value === '') return false;
    let next = String(value).trim();
    if (input.type === 'date') next = parseDate(next);
    if (input.tagName === 'SELECT') {
      const option = [...input.options].find((item) => item.value === next || item.textContent.trim().toLowerCase() === next.toLowerCase());
      if (!option) return false;
      next = option.value;
    }
    input.value = next;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function applyExtractedFields(fields, form) {
    const allowed = new Set([...form.querySelectorAll('[data-k]')].map((input) => input.dataset.k));
    const applied = [];
    Object.entries(fields || {}).forEach(([key, value]) => {
      if (!allowed.has(key)) return;
      if (setField(key, value, form)) applied.push(key);
    });
    // O app.js existente mantém o estado em formData; sincronizamos depois do dispatch.
    if (typeof global.syncFormFromDOM === 'function') global.syncFormFromDOM();
    return applied;
  }

  async function extractFields(transcript, form) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, fields: getFormSchema(form) }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'Não foi possível interpretar o ditado.');
    return body.fields || {};
  }

  function initVoiceDictation({ form = document.querySelector('#mainForm'), button = document.querySelector('#voiceDictationBtn'), status = document.querySelector('#voiceDictationStatus') } = {}) {
    if (!form || !button) return;
    if (!SpeechRecognition) {
      button.disabled = true;
      button.title = 'Seu navegador não oferece reconhecimento de voz.';
      if (status) status.textContent = 'Ditado indisponível neste navegador. Use Chrome ou Edge atualizado.';
      return;
    }
    if (button.dataset.voiceBound === 'true') return;
    button.dataset.voiceBound = 'true';

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;
    let finalTranscript = '';
    let stoppedByUser = false;

    const setStatus = (text) => { if (status) status.textContent = text; };
    const setRecording = (recording) => {
      button.classList.toggle('is-recording', recording);
      button.setAttribute('aria-pressed', String(recording));
      button.textContent = recording ? 'Parar ditado' : 'Ditado/Microfone';
    };

    recognition.onstart = () => { setRecording(true); setStatus('Ouvindo. Diga o nome do campo e o valor.'); };
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += `${text} `;
        else interim += text;
      }
      setStatus(`Transcrição: ${normalize(finalTranscript + interim)}`);
    };
    recognition.onerror = (event) => {
      setRecording(false);
      setStatus(event.error === 'not-allowed' ? 'Permissão do microfone negada.' : `Erro no microfone: ${event.error}.`);
    };
    recognition.onend = async () => {
      setRecording(false);
      const transcript = normalize(finalTranscript);
      if (!stoppedByUser || !transcript) return;
      button.disabled = true;
      setStatus('Interpretando os campos identificados...');
      try {
        const fields = await extractFields(transcript, form);
        const applied = applyExtractedFields(fields, form);
        setStatus(applied.length ? `${applied.length} campo(s) preenchido(s). Revise antes de salvar.` : 'Nenhum campo reconhecido. Tente falar “nome do paciente: ...”.');
      } catch (error) {
        setStatus(error.message || 'Falha ao interpretar o ditado.');
      } finally {
        button.disabled = false;
      }
    };

    button.addEventListener('click', () => {
      if (button.classList.contains('is-recording')) {
        stoppedByUser = true;
        recognition.stop();
        return;
      }
      finalTranscript = '';
      stoppedByUser = true;
      try { recognition.start(); } catch (error) { setStatus('O reconhecimento já está em execução.'); }
    });
  }

  global.initVoiceDictation = initVoiceDictation;
  global.applyExtractedFields = applyExtractedFields;
})(window);
