/* Integração do WhatsApp no formulário do VISAT.
 * A ficha é a linha public.records; o conteúdo do formulário fica em records.data.
 */
const whatsappSubscriptions = new Map();

function whatsappSupabaseClient() {
  return window.supabaseClient || window.__visatSupabaseClient || null;
}

function whatsappEsc(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
}

function whatsappStatusLabel(status) {
  return ({
    queued: 'na fila',
    sent: 'enviada',
    delivered: 'entregue',
    read: 'lida',
    failed: 'falhou',
    received: 'recebida',
  }[status] || status || '');
}

function whatsappStatusIcon(status) {
  return ({ queued: '…', sent: '✓', delivered: '✓✓', read: '✓✓ lida', failed: '✗ falhou', received: '' }[status] || '');
}

// fichaId é o id da linha em public.records, e não fichaNumero.
async function enviarWhatsApp(ficha) {
  const sb = whatsappSupabaseClient();
  if (!sb) { alert('A conexão com o Supabase ainda não está disponível.'); return false; }
  if (!ficha?.fichaId) { alert('A ficha precisa estar salva antes do envio.'); return false; }
  if (!String(ficha.telefone || '').trim()) { alert('Informe o telefone do paciente antes do envio.'); return false; }
  if (!String(ficha.dataNotificacao || '').trim()) { alert('Informe a data da notificação antes do envio.'); return false; }
  if (!window.confirm(`Enviar mensagem de investigação para ${ficha.nome || 'o paciente'}?`)) return false;

  const { data, error } = await sb.functions.invoke('send-whatsapp', {
    body: {
      ficha_id: String(ficha.fichaId),
      nome: ficha.nome,
      telefone: ficha.telefone,
      data_notificacao: ficha.dataNotificacao,
      template: ficha.template,
    },
  });
  if (error || data?.erro) {
    alert('Falha no envio: ' + (data?.erro || error?.message || 'erro desconhecido'));
    return false;
  }
  if (data?.aviso) console.warn(data.aviso);
  return true;
}

async function carregarHistoricoWhatsApp(fichaId) {
  const sb = whatsappSupabaseClient();
  if (!sb || !fichaId) return [];
  const { data, error } = await sb
    .from('whatsapp_mensagens')
    .select('direcao, tipo, corpo, status, erro, criado_em, atualizado_em')
    .eq('ficha_id', String(fichaId))
    .order('criado_em', { ascending: true });
  if (error) {
    console.error('Falha ao carregar histórico do WhatsApp', error);
    return [];
  }
  return data || [];
}

function renderHistoricoWhatsApp(el, mensagens) {
  if (!el) return;
  if (!mensagens.length) {
    el.innerHTML = '<div class="whatsapp-empty">Nenhuma mensagem registrada para esta ficha.</div>';
    return;
  }
  el.innerHTML = mensagens.map(message => {
    const outgoing = message.direcao === 'out';
    const status = whatsappStatusLabel(message.status);
    const icon = whatsappStatusIcon(message.status);
    return `<div class="whatsapp-bubble-row ${outgoing ? 'out' : 'in'}">
      <div class="whatsapp-bubble ${outgoing ? 'out' : 'in'}">
        <div class="whatsapp-bubble-text">${whatsappEsc(message.corpo || `[${message.tipo || 'mensagem'}]`)}</div>
        <small>${whatsappEsc(new Date(message.criado_em).toLocaleString('pt-BR'))}${status ? ` · ${whatsappEsc(status)}` : ''}${icon ? ` ${whatsappEsc(icon)}` : ''}${message.erro ? ' · erro' : ''}</small>
      </div>
    </div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

function assinarHistoricoWhatsApp(fichaId, el) {
  const sb = whatsappSupabaseClient();
  if (!sb || !fichaId || !el) return null;
  const key = String(fichaId);
  const previous = whatsappSubscriptions.get(key);
  if (previous) sb.removeChannel(previous);

  const refresh = async () => renderHistoricoWhatsApp(el, await carregarHistoricoWhatsApp(key));
  refresh();
  const safeChannelKey = key.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || 'ficha';
  const channel = sb.channel(`wpp-${safeChannelKey}`)
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'whatsapp_mensagens', filter: `ficha_id=eq.${key}`,
    }, refresh)
    .subscribe();
  whatsappSubscriptions.set(key, channel);
  return channel;
}

function prepararHistoricoWhatsApp() {
  const el = document.querySelector('[data-whatsapp-history]');
  if (!el) return;
  assinarHistoricoWhatsApp(el.dataset.fichaId, el);
}

function encerrarAssinaturasWhatsApp() {
  const sb = whatsappSupabaseClient();
  if (sb) whatsappSubscriptions.forEach(channel => sb.removeChannel(channel));
  whatsappSubscriptions.clear();
}

window.enviarWhatsApp = enviarWhatsApp;
window.carregarHistoricoWhatsApp = carregarHistoricoWhatsApp;
window.renderHistoricoWhatsApp = renderHistoricoWhatsApp;
window.assinarHistoricoWhatsApp = assinarHistoricoWhatsApp;
window.prepararHistoricoWhatsApp = prepararHistoricoWhatsApp;
window.encerrarAssinaturasWhatsApp = encerrarAssinaturasWhatsApp;
