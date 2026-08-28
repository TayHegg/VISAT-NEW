const FIELD_ALIASES = {
  fichaNumero: ['número da ficha', 'numero da ficha', 'número ficha', 'numero ficha'],
  dataLancamento: ['data de lançamento', 'data lançamento', 'data de lancamento'],
  unidadeSaude: ['unidade de saúde', 'unidade de saude', 'fonte notificadora'],
};

function normalize(value) {
  return String(value || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/\s+/g, ' ').trim();
}

function dateToIso(value) {
  const match = String(value || '').match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/);
  return match ? `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}` : value;
}

function localExtract(transcript, schema) {
  const source = normalize(transcript);
  const output = {};
  const fields = Array.isArray(schema) ? schema : [];

  for (const field of fields) {
    const key = field && field.key;
    if (!key) continue;
    const label = normalize(field.label || key);
    const aliases = [...new Set([...(FIELD_ALIASES[key] || []), label])]
      .filter(Boolean).map(normalize).sort((a, b) => b.length - a.length);
    const alias = aliases.find((item) => source.includes(item));
    if (!alias) continue;

    const start = source.indexOf(alias) + alias.length;
    const tail = source.slice(start).replace(/^[\s:=-]+/, '');
    const nextLabels = fields
      .filter((item) => item && item.key !== key)
      .flatMap((item) => [normalize(item.label || ''), ...(FIELD_ALIASES[item.key] || []).map(normalize)])
      .filter(Boolean);
    const next = nextLabels.map((item) => tail.indexOf(item)).filter((index) => index >= 0);
    const raw = tail.slice(0, next.length ? Math.min(...next) : tail.length)
      .replace(/[,.!?;]+\s*$/, '').trim();
    if (!raw) continue;

    if (field.type === 'date') output[key] = dateToIso(raw);
    else if (field.type === 'select' && Array.isArray(field.options)) {
      const option = field.options.find((item) => {
        const value = normalize(item.value);
        const optionLabel = normalize(item.label);
        return raw === value || raw === optionLabel || raw.includes(optionLabel);
      });
      if (option) output[key] = option.value;
    } else output[key] = raw;
  }

  // Forma natural usada no exemplo da interface: “ficha 565 ... unidade ...”.
  if (!output.fichaNumero) {
    const match = source.match(/(?:numero|número)\s+da\s+ficha\s+(\d+)/);
    if (match && fields.some((field) => field.key === 'fichaNumero')) output.fichaNumero = match[1];
  }
  if (!output.dataLancamento) {
    const match = source.match(/data\s+(?:de\s+)?lan[çc]amento\s+(\d{1,2}[\/-]\d{1,2}[\/-]\d{4})/);
    if (match && fields.some((field) => field.key === 'dataLancamento')) output.dataLancamento = dateToIso(match[1]);
  }
  if (!output.unidadeSaude) {
    const match = source.match(/unidade\s+de\s+sa[úu]de\s+(.+?)(?=\s+(?:data|número|numero|município|municipio)\b|$)/);
    if (match && fields.some((field) => field.key === 'unidadeSaude')) output.unidadeSaude = match[1].trim();
  }
  return output;
}

function send(res, status, body) {
  res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'POST') return send(res, 405, { error: 'Método não permitido.' });

  const { transcript, fields } = req.body || {};
  if (typeof transcript !== 'string' || !transcript.trim()) return send(res, 400, { error: 'A transcrição está vazia.' });
  if (transcript.length > 12000) return send(res, 413, { error: 'A transcrição é muito longa. Faça o ditado em partes menores.' });
  if (!Array.isArray(fields)) return send(res, 400, { error: 'O esquema de campos não foi enviado.' });

  const localFields = localExtract(transcript, fields);
  if (Object.keys(localFields).length) return send(res, 200, { fields: localFields, source: 'local' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return send(res, 503, { error: 'Serviço de interpretação indisponível: OPENAI_API_KEY não configurada.' });

  const prompt = 'Extraia somente os campos presentes na transcrição. Retorne um objeto JSON com as chaves key do esquema. Não invente valores; respeite exatamente os valores permitidos nos campos select.';
  let response;
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: JSON.stringify({ transcript, fields }) },
        ],
      }),
    });
  } catch (error) {
    console.error('OpenAI extraction network error', error);
    return send(res, 503, { error: 'O serviço de interpretação não respondeu. Tente novamente.' });
  }

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('OpenAI extraction error', response.status, body);
    if (response.status === 401 || response.status === 403) return send(res, 502, { error: 'A chave da OpenAI foi recusada. Verifique OPENAI_API_KEY na Vercel.' });
    if (response.status === 429) return send(res, 503, { error: 'A interpretação automática está temporariamente indisponível porque a conta da OpenAI atingiu a quota. Comandos simples no formato “campo: valor” continuam disponíveis.' });
    return send(res, 502, { error: 'O serviço de interpretação não respondeu corretamente.' });
  }

  try {
    const content = body.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);
    return send(res, 200, { fields: parsed && typeof parsed === 'object' ? parsed : {} });
  } catch (error) {
    console.error('OpenAI extraction invalid JSON', error);
    return send(res, 502, { error: 'A resposta do serviço de interpretação veio em formato inválido.' });
  }
}

export { localExtract };

export const config = { api: { bodyParser: { sizeLimit: '256kb' } } };

// Keep eslint-free compatibility with Vercel's Node runtime.
void FIELD_ALIASES;
