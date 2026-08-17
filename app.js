/* ============================= DADOS DE REFERÊNCIA ============================= */
const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const AGRAVOS = {
  grave: {label:"Acidente de Trabalho Grave", cid:"Y96", implemented:true},
  biologico: {label:"Exposição a Material Biológico", cid:"Z20.9", implemented:true},
  mental: {label:"Transtorno Mental Relacionado ao Trabalho", cid:"F99", implemented:true},
  lerdort: {label:"LER/DORT", cid:"Z57.9", implemented:true},
};

const STATUS_OPTIONS = [
  ['finalizado','Finalizado'],
  ['aguardando_investigacao','Aguardando investigação'],
];

// Base de CID-10 relevante à saúde do trabalhador (referência local — não substitui a tabela oficial completa do DATASUS)
const CID10_DB = [
  {code:"V01",desc:"Pedestre traumatizado em colisão com veículo a pedal"},
  {code:"V09",desc:"Pedestre traumatizado em outros acidentes de transporte"},
  {code:"V20",desc:"Motociclista traumatizado em colisão com veículo a motor de duas ou três rodas"},
  {code:"V29",desc:"Motociclista traumatizado em outros acidentes de transporte"},
  {code:"V43",desc:"Ocupante de automóvel traumatizado em colisão com outro veículo a motor"},
  {code:"V89",desc:"Acidente de veículo a motor ou sem motor, tipo não especificado"},
  {code:"W00",desc:"Queda no mesmo nível envolvendo gelo e neve"},
  {code:"W01",desc:"Queda no mesmo nível por escorregão, tropeção ou passo em falso"},
  {code:"W03",desc:"Outra queda no mesmo nível por colisão com outra pessoa"},
  {code:"W05",desc:"Queda de cadeira de rodas"},
  {code:"W10",desc:"Queda em ou de escadas ou degraus"},
  {code:"W11",desc:"Queda em ou de escada de mão (portátil)"},
  {code:"W12",desc:"Queda em ou de andaime"},
  {code:"W13",desc:"Queda em ou de edifício ou outra estrutura"},
  {code:"W17",desc:"Outra queda de um nível a outro"},
  {code:"W18",desc:"Outra queda no mesmo nível"},
  {code:"W19",desc:"Queda não especificada"},
  {code:"W20",desc:"Atingido por objeto lançado, projetado ou em queda"},
  {code:"W21",desc:"Impacto contra ou golpe por equipamento de esporte"},
  {code:"W23",desc:"Ficar preso, esmagado, cortado, comprimido entre objetos"},
  {code:"W24",desc:"Contato traumático com equipamento de elevação e transmissão não especificado"},
  {code:"W25",desc:"Contato traumático com vidro cortante"},
  {code:"W26",desc:"Contato traumático com faca, espada ou punhal"},
  {code:"W27",desc:"Contato traumático com ferramenta manual sem força motriz"},
  {code:"W28",desc:"Contato traumático com cortador de grama motorizado"},
  {code:"W29",desc:"Contato traumático com outras ferramentas motorizadas manuais"},
  {code:"W31",desc:"Contato traumático com outras máquinas e as não especificadas"},
  {code:"W45",desc:"Corpo estranho penetrante ou objeto penetrante através da pele"},
  {code:"W49",desc:"Exposição a outras forças mecânicas inanimadas"},
  {code:"W54",desc:"Mordedura ou golpe por cão"},
  {code:"X30",desc:"Exposição a calor natural excessivo"},
  {code:"X33",desc:"Vítima de relâmpago"},
  {code:"X50",desc:"Excesso de esforços e movimentos extenuantes ou repetitivos"},
  {code:"Y96",desc:"Circunstância relativa às condições de trabalho"},
  {code:"Y97",desc:"Circunstância relativa a condições de poluição ambiental"},
  {code:"Y98",desc:"Circunstância relativa às condições do modo de vida"},
  {code:"Z20.9",desc:"Contato e exposição a doença infecciosa não especificada"},
  {code:"B20",desc:"Doença pelo HIV resultando em doenças infecciosas e parasitárias"},
  {code:"B16",desc:"Hepatite aguda B"},
  {code:"B17.1",desc:"Hepatite aguda C"},
  {code:"B18",desc:"Hepatite viral crônica"},
  {code:"F32",desc:"Episódios depressivos"},
  {code:"F41",desc:"Outros transtornos ansiosos"},
  {code:"F43",desc:"Reações ao estresse grave e transtornos de adaptação"},
  {code:"Z73.0",desc:"Síndrome de esgotamento profissional (Burnout)"},
  {code:"F10",desc:"Transtornos mentais e comportamentais devidos ao uso de álcool"},
  {code:"R45",desc:"Sintomas e sinais relativos ao estado emocional"},
  {code:"G56",desc:"Mononeuropatias dos membros superiores (ex.: Síndrome do túnel do carpo)"},
  {code:"M54",desc:"Dorsalgia"},
  {code:"M65",desc:"Sinovite e tenossinovite"},
  {code:"M70",desc:"Transtornos dos tecidos moles relacionados com o uso, uso excessivo e pressão"},
  {code:"M75",desc:"Lesões do ombro"},
  {code:"M77",desc:"Outras entesopatias (ex.: epicondilite)"},
  {code:"G90",desc:"Transtornos do sistema nervoso autônomo"},
];

// Base de CBO relevante (amostra — referência local, não substitui a tabela oficial completa do MTE)
const CBO_DB = [
  {code:"7102-05",desc:"Pedreiro"},
  {code:"7156-10",desc:"Soldador"},
  {code:"7841-05",desc:"Motorista de caminhão (rotas regionais e internacionais)"},
  {code:"7825-10",desc:"Operador de máquinas de terraplenagem"},
  {code:"5211-05",desc:"Operador de caixa (comércio)"},
  {code:"5134-15",desc:"Cozinheiro geral"},
  {code:"2235-05",desc:"Enfermeiro"},
  {code:"3222-05",desc:"Técnico de enfermagem"},
  {code:"5162-05",desc:"Cuidador de idosos"},
  {code:"7522-10",desc:"Marceneiro"},
  {code:"8221-10",desc:"Trabalhador da fabricação de produtos alimentícios"},
  {code:"5171-20",desc:"Vigilante"},
  {code:"5143-20",desc:"Trabalhador dos serviços de limpeza e conservação de áreas públicas"},
  {code:"7841-20",desc:"Motorista de ônibus urbano"},
  {code:"9151-05",desc:"Mecânico de manutenção de máquinas em geral"},
  {code:"5133-05",desc:"Garçom"},
  {code:"4110-10",desc:"Assistente administrativo"},
  {code:"3113-05",desc:"Técnico em eletrotécnica"},
  {code:"6220-10",desc:"Trabalhador agropecuário em geral"},
  {code:"7241-10",desc:"Eletricista de instalações"},
  {code:"7231-05",desc:"Mecânico de manutenção de veículos automotores"},
  {code:"7154-20",desc:"Encanador"},
  {code:"5211-10",desc:"Balconista de comércio varejista"},
  {code:"8232-05",desc:"Operador de máquinas têxteis"},
  {code:"9112-05",desc:"Faxineiro"},
  {code:"3221-05",desc:"Técnico em segurança do trabalho"},
  {code:"2263-10",desc:"Engenheiro de segurança do trabalho"},
  {code:"5162-10",desc:"Auxiliar de enfermagem"},
  {code:"7863-05",desc:"Estivador"},
  {code:"7422-05",desc:"Trabalhador da extração de minérios"},
];

const PARTES_CORPO = ["Olho","Cabeça","Pescoço","Tórax","Abdome","Mão","Membro superior","Membro inferior","Pé","Todo o corpo","Outro"];

// Mapeamento das partes do corpo oficiais do SINAN para as regiões consolidadas do mapa corporal
const BODY_REGIONS = [
  {key:'olho', label:'Olho', view:'front', match:['Olho']},
  {key:'cabeca', label:'Cabeça/Face', view:'front', match:['Cabeça','Pescoço']},
  {key:'torax', label:'Tórax/Abdome', view:'front', match:['Tórax','Abdome']},
  {key:'mao', label:'Dedo/Mão', view:'front', match:['Mão']},
  {key:'braco', label:'Pulso/Braço/Cotovelo', view:'front', match:['Membro superior']},
  {key:'perna', label:'Perna/Joelho', view:'back', match:['Membro inferior']},
  {key:'pe', label:'Pé/Tornozelo', view:'back', match:['Pé']},
  {key:'outros', label:'Outros', view:'back', match:['Todo o corpo','Outro']},
];
const AGRAVO_COLORS = { grave:'var(--c-grave)', biologico:'var(--c-bio)', mental:'var(--c-mental)', lerdort:'var(--c-lerdort)' };
const AGRAVO_HEX = { grave:'#2E6FB0', biologico:'#D97A2B', mental:'#1B8A72', lerdort:'#7B4FA0' };
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const EVOLUCAO_LABELS = {
  grave: {'1':'Cura','2':'Incapacidade temporária','3':'Incapacidade parcial permanente','4':'Incapacidade total permanente','5':'Óbito por acidente de trabalho grave','6':'Óbito por outras causas','7':'Outro','9':'Ignorado'},
  lerdort: {'1':'Cura','2':'Cura não confirmada','3':'Incapacidade Temporária','4':'Incapacidade Permanente Parcial','5':'Incapacidade Permanente Total','6':'Óbito por doença relacionada ao trabalho','7':'Óbito por Outra Causa','8':'Outro','9':'Ignorado'},
  mental: {'1':'Cura','2':'Cura não confirmada','3':'Incapacidade Temporária','4':'Incapacidade Permanente Parcial','5':'Incapacidade Permanente Total','6':'Óbito por doença relacionada ao trabalho','7':'Óbito por Outra Causa','8':'Outro','9':'Ignorado'},
  biologico: {'1':'Alta com conversão sorológica','2':'Alta sem conversão sorológica','3':'Alta paciente fonte negativo','4':'Abandono','5':'Óbito por acidente com exposição a material biológico','6':'Óbito por Outra Causa','9':'Ignorado'},
};
const RACA_LABELS = {'1':'Branca','2':'Preta','3':'Amarela','4':'Parda','5':'Indígena','9':'Ignorado'};
const ESCOLARIDADE_LABELS = {'0':'Analfabeto','1':'1ª a 4ª série incompleta EF','2':'4ª série completa EF','3':'5ª a 8ª série incompleta EF','4':'Ensino fundamental completo','5':'Ensino médio incompleto','6':'Ensino médio completo','7':'Educação superior incompleta','8':'Educação superior completa','9':'Ignorado','10':'Não se aplica'};

/* ============================= ESTADO ============================= */
let records = [];
let view = 'dashboard';
let editingId = null;
let formPage = 1;
let formData = {};
let tableState = { search:'', sortKey:'patientName', sortDir:1, filterAgravo:'', filterStatus:'', filterSituacao:'', page:1, pageSize:10 };
let dashFilters = { ano:'', periodoIni:'', periodoFim:'', mes:'', agravo:'', unidade:'', municipio:'', bairro:'', ocupacao:'', sexo:'', racaCor:'', escolaridade:'', tipoAcidente:'', status:'', obito:'' };
let bmSelectedRegion = null;
let pendingDeleteId = null;
let dashboardCardFilter = '';
let analyticsCardFilter = null;

/* ============================= SUPABASE ============================= */
const SUPABASE_URL = 'https://rjcjvxxmfvasymcncrge.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OqhyfChr2RxPl3xfxAPyuQ_sge3PV7j';
let supabaseClient = null;
try{
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}catch(e){
  console.error('Falha ao inicializar cliente Supabase (biblioteca não carregou):', e);
}

async function loadRecords(){
  try{
    const { data, error } = await supabaseClient
      .from('records')
      .select('data')
      .order('updated_at', { ascending: true });
    if(error) throw error;
    records = (data || []).map(row => row.data);
  }catch(e){
    console.error('Falha ao carregar registros do Supabase', e);
    records = [];
    showToast('Não foi possível conectar ao banco de dados.');
  }
}

async function upsertRecordRemote(record){
  try{
    const { error } = await supabaseClient
      .from('records')
      .upsert({ id: record.id, data: record, updated_at: new Date().toISOString() }, { onConflict: 'id' });
    if(error) throw error;
    return true;
  }catch(e){
    console.error('Falha ao salvar no Supabase', e);
    return false;
  }
}

async function deleteRecordRemote(id){
  try{
    const { error } = await supabaseClient.from('records').delete().eq('id', id);
    if(error) throw error;
    return true;
  }catch(e){
    console.error('Falha ao excluir no Supabase', e);
    return false;
  }
}

/* ============================= AUTENTICAÇÃO ============================= */
let currentUser = null;

const APP_SHELL_HTML = `
<div class="app">
  <aside class="sidebar" id="sidebar">
    <div class="brand">
      <div class="tag">Vigilância em Saúde do Trabalhador</div>
      <div class="title">SNAT — Notificação de Acidentes de Trabalho</div>
    </div>
    <div class="nav-item" data-view="dashboard"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>Painel</div>
    <div class="nav-item" data-view="analytics"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>Dashboard Analítico</div>
    <div class="nav-item" data-view="consulta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>Consulta de Fichas</div>
    <div class="nav-item" data-view="form"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Novo Registro</div>
    <div class="foot" id="sidebarFoot">4 fichas oficiais do SINAN implementadas: Acidente Grave, Exposição a Material Biológico, Transtorno Mental e LER/DORT.</div>
  </aside>

  <main class="main">
    <div class="topbar">
      <div>
        <h1 id="topbarTitle">Painel</h1>
        <div class="sub" id="topbarSub">Visão geral das notificações e pendências</div>
      </div>
      <div class="no-print" style="display:flex;gap:8px;align-items:center;">
        <span id="userEmailLabel" style="font-size:12.5px;color:var(--text-muted);margin-right:4px;"></span>
        <button class="btn btn-ghost btn-sm" id="logoutBtn">Sair</button>
        <button class="btn btn-primary" onclick="goTo('form')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Novo Registro
        </button>
      </div>
    </div>
    <div class="content" id="content"></div>
  </main>
</div>`;

function renderLogin(errorMsg){
  return `
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-brand">
        <div class="tag">Vigilância em Saúde do Trabalhador</div>
        <div class="title">SNAT</div>
        <div class="subtitle">Sistema de Notificação de Acidentes de Trabalho</div>
      </div>
      <form id="loginForm" class="login-form" autocomplete="on">
        <div class="field">
          <label>E-mail</label>
          <input type="email" id="loginEmail" autocomplete="username" value="${esc(getRememberedEmail())}" required>
        </div>
        <div class="field">
          <label>Senha</label>
          <div style="position:relative;">
            <input type="password" id="loginPassword" autocomplete="current-password" required style="width:100%;padding-right:38px;">
            <button type="button" id="togglePasswordBtn" title="Mostrar/ocultar senha" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:4px;color:var(--text-muted);display:flex;">
              <svg id="togglePasswordIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="field">
          <label style="display:flex;align-items:center;gap:7px;font-weight:400;cursor:pointer;">
            <input type="checkbox" id="rememberMeCheck" ${getRememberedEmail() ? 'checked' : ''}>
            Lembrar meu e-mail neste dispositivo
          </label>
          <div class="hint">Guardamos apenas o seu e-mail neste navegador para agilizar o próximo acesso. Por segurança, nunca salvamos sua senha — se quiser, o próprio navegador pode oferecer para lembrá-la de forma protegida.</div>
        </div>
        ${errorMsg ? `<div class="login-error">${esc(errorMsg)}</div>` : ''}
        <button type="submit" class="btn btn-primary" id="loginSubmitBtn" style="width:100%;justify-content:center;margin-top:4px;">Entrar</button>
      </form>
      <div class="login-hint">Acesso restrito à equipe autorizada. Fale com o administrador do sistema para obter uma conta.</div>
    </div>
  </div>`;
}

function traduzErroLogin(msg){
  if(/invalid login credentials/i.test(msg)) return 'E-mail ou senha inválidos.';
  if(/email not confirmed/i.test(msg)) return 'E-mail ainda não confirmado. Verifique sua caixa de entrada.';
  if(/rate limit/i.test(msg)) return 'Muitas tentativas. Aguarde um instante e tente novamente.';
  return 'Não foi possível entrar. Tente novamente.';
}

function getRememberedEmail(){
  try{ return localStorage.getItem('snat_remembered_email') || ''; }catch(e){ return ''; }
}
function setRememberedEmail(email){
  try{
    if(email){ localStorage.setItem('snat_remembered_email', email); }
    else{ localStorage.removeItem('snat_remembered_email'); }
  }catch(e){ /* localStorage indisponível — ignora silenciosamente */ }
}

function bindLoginEvents(){
  const form = document.getElementById('loginForm');
  if(!form) return;
  form.addEventListener('submit', handleLoginSubmit);

  const toggleBtn = document.getElementById('togglePasswordBtn');
  const pwdInput = document.getElementById('loginPassword');
  if(toggleBtn && pwdInput){
    toggleBtn.addEventListener('click', ()=>{
      const isHidden = pwdInput.type === 'password';
      pwdInput.type = isHidden ? 'text' : 'password';
      const icon = document.getElementById('togglePasswordIcon');
      icon.innerHTML = isHidden
        ? '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.6 21.6 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a21.6 21.6 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
        : '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>';
    });
  }
}

async function handleLoginSubmit(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMeCheck');
  setRememberedEmail(rememberMe && rememberMe.checked ? email : '');
  const btn = document.getElementById('loginSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'Entrando...';
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if(error){
    document.getElementById('appRoot').innerHTML = renderLogin(traduzErroLogin(error.message));
    bindLoginEvents();
    return;
  }
  currentUser = data.user;
  await startApp();
}

async function handleLogout(){
  await supabaseClient.auth.signOut();
  currentUser = null;
  records = [];
  document.getElementById('appRoot').innerHTML = renderLogin();
  bindLoginEvents();
}

function bindNavEvents(){
  document.querySelectorAll('.nav-item').forEach(el=>{
    el.addEventListener('click', ()=> goTo(el.dataset.view));
  });
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  const userLabel = document.getElementById('userEmailLabel');
  if(userLabel && currentUser) userLabel.textContent = currentUser.email || '';
}

async function startApp(){
  document.getElementById('appRoot').innerHTML = APP_SHELL_HTML;
  bindNavEvents();
  await loadRecords();
  render();
}



/* ============================= VALIDAÇÃO / ALERTAS ============================= */
const REQUIRED_COMMON = ['unidadeSaude','patientName','dataNascimento','sexo','dataNotificacao','municipioNotificacao','ufNotificacao','ocupacao','nomeEmpresa'];
const REQUIRED_GRAVE = ['dataAcidente','municipioOcorrencia','ufOcorrencia','tipoAcidente','ocorreuAtendimentoMedico'];
const REQUIRED_LERDORT = ['dataDiagnosticoLD','regimeTratamentoLD'];
const REQUIRED_MENTAL = ['dataDiagnosticoMental','regimeTratamentoMental'];
const REQUIRED_BIOLOGICO = ['dataAcidenteBio','tipoExposicao','materialOrganico'];

function isEmpty(v){ return v==null || v==='' || (Array.isArray(v) && v.length===0); }

function computeAlerts(r){
  const alerts = [];
  const missingCommon = REQUIRED_COMMON.filter(f => isEmpty(r[f]));
  let missingType = [];
  if(r.agravoType === 'grave') missingType = REQUIRED_GRAVE.filter(f => isEmpty(r[f]));
  else if(r.agravoType === 'lerdort') missingType = REQUIRED_LERDORT.filter(f => isEmpty(r[f]));
  else if(r.agravoType === 'mental') missingType = REQUIRED_MENTAL.filter(f => isEmpty(r[f]));
  else if(r.agravoType === 'biologico') missingType = REQUIRED_BIOLOGICO.filter(f => isEmpty(r[f]));
  if(missingCommon.length || missingType.length){
    alerts.push({level:'red', code:'campos_obrigatorios', label:`${missingCommon.length + missingType.length} campo(s) obrigatório(s) vazio(s)`});
  }
  if(r.foiEmitidaCAT === '2'){
    alerts.push({level:'red', code:'cat', label:'CAT não emitida'});
  }
  if(r.agravoType === 'grave'){
    if(isEmpty(r.diagnosticoLesaoCID10) && isEmpty(r.causaCID10)){
      alerts.push({level:'amber', code:'cid', label:'CID não informado'});
    }
    if(isEmpty(r.investigadorNome)){
      alerts.push({level:'red', code:'investigacao', label:'Acidente grave sem investigação registrada'});
    }
  } else if(r.agravoType === 'lerdort' || r.agravoType === 'mental'){
    if(isEmpty(r.diagnosticoCID10)){
      alerts.push({level:'amber', code:'cid', label:'CID não informado'});
    }
    if(isEmpty(r.investigadorNome)){
      alerts.push({level:'amber', code:'investigacao', label:'Ficha sem investigador registrado'});
    }
  } else if(r.agravoType === 'biologico'){
    if(isEmpty(r.investigadorNome)){
      alerts.push({level:'amber', code:'investigacao', label:'Ficha sem investigador registrado'});
    }
  }
  if(r.status === 'aguardando_investigacao'){
    alerts.push({level:'amber', code:'pendencia', label:'Aguardando investigação'});
  }
  if(!alerts.length){
    alerts.push({level:'green', code:'ok', label:'Sem pendências identificadas'});
  }
  return alerts;
}
function worstLevel(alerts){
  if(alerts.some(a=>a.level==='red')) return 'red';
  if(alerts.some(a=>a.level==='amber')) return 'amber';
  return 'green';
}

/* ============================= HELPERS ============================= */
function uid(){ return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function esc(s){ return (s==null?'':String(s)).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtDate(d){ if(!d) return '—'; const [y,m,day]=d.split('-'); return day&&m&&y ? `${day}/${m}/${y}` : d; }
function calcIdade(dob){
  if(!dob) return null;
  const b = new Date(dob+'T00:00:00'); const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const mDiff = now.getMonth() - b.getMonth();
  if(mDiff < 0 || (mDiff===0 && now.getDate() < b.getDate())) age--;
  return age;
}
function faixaEtaria(age){
  if(age==null) return '—';
  if(age<18) return 'Menor de 18 anos';
  if(age<=24) return '18–24 anos';
  if(age<=34) return '25–34 anos';
  if(age<=44) return '35–44 anos';
  if(age<=54) return '45–54 anos';
  if(age<=64) return '55–64 anos';
  return '65 anos ou mais';
}
function showToast(msg){
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>${esc(msg)}`;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 2600);
}

/* ============================= NAVEGAÇÃO ============================= */
function goTo(v, id){
  view = v;
  if(v==='form'){
    editingId = id || null;
    formPage = 1;
    formData = id ? {...records.find(r=>r.id===id)} : { id: uid(), agravoType:'grave', status:'aguardando_investigacao', createdAt: new Date().toISOString() };
  } else if(v==='print'){
    editingId = id || editingId || null;
  }
  render();
}

/* ============================= RENDER RAIZ ============================= */
function render(){
  document.querySelectorAll('.nav-item').forEach(el=> el.classList.toggle('active', el.dataset.view===view));
  const titles = {
    dashboard:['Painel','Visão geral das notificações e pendências'],
    analytics:['Dashboard Analítico','Painel de Controle de Acidentes e Agravos Relacionados ao Trabalho'],
    consulta:['Consulta de Fichas','Buscar, filtrar e gerenciar notificações registradas'],
    form:[editingId? 'Editar Registro':'Novo Registro','Ficha de Investigação — Acidente de Trabalho'],
    print:['Visualizar / Imprimir','Ficha de Investigação — Acidente de Trabalho'],
  };
  document.getElementById('topbarTitle').textContent = titles[view][0];
  document.getElementById('topbarSub').textContent = titles[view][1];
  const c = document.getElementById('content');
  if(view==='dashboard') c.innerHTML = renderDashboard();
  else if(view==='analytics') c.innerHTML = renderAnalytics();
  else if(view==='consulta') c.innerHTML = renderConsulta();
  else if(view==='form') c.innerHTML = renderForm();
  else if(view==='print') c.innerHTML = renderPrint(editingId);
  if(view==='form') bindFormEvents();
  if(view==='consulta') bindConsultaEvents();
  if(view==='analytics') bindAnalyticsEvents();
}

/* ============================= DASHBOARD ANALÍTICO ============================= */
let lastBodyRegionData = {counts:{}, totalHits:0};

function pct(n,total){ return total? Math.round(n/total*1000)/10 : 0; }
function getEventDate(r){ return r.dataNotificacao || r.dataAcidente || r.dataAcidenteBio || r.dataDiagnosticoLD || r.dataDiagnosticoMental || ''; }
function isObito(r){
  const label = (EVOLUCAO_LABELS[r.agravoType]||{})[r.evolucaoCaso];
  return !!(label && label.toLowerCase().includes('óbito'));
}
function distinctValues(field){
  return [...new Set(records.map(r=>r[field]).filter(v=>v!==undefined && v!==null && v!==''))].sort((a,b)=> String(a).localeCompare(String(b),'pt-BR'));
}

const REQUIRED_FIELD_LABELS = {
  unidadeSaude:'Unidade de Saúde',
  patientName:'Nome do paciente',
  dataNascimento:'Data de nascimento',
  sexo:'Sexo',
  dataNotificacao:'Data da notificação',
  municipioNotificacao:'Município de notificação',
  ufNotificacao:'UF de notificação',
  ocupacao:'Ocupação',
  nomeEmpresa:'Nome da empresa',
  dataAcidente:'Data do acidente',
  municipioOcorrencia:'Município de ocorrência',
  ufOcorrencia:'UF de ocorrência',
  tipoAcidente:'Tipo de acidente',
  ocorreuAtendimentoMedico:'Atendimento médico',
  dataDiagnosticoLD:'Data do diagnóstico',
  regimeTratamentoLD:'Regime de tratamento',
  dataDiagnosticoMental:'Data do diagnóstico',
  regimeTratamentoMental:'Regime de tratamento',
  dataAcidenteBio:'Data do acidente/exposição',
  tipoExposicao:'Tipo de exposição',
  materialOrganico:'Material orgânico',
};

function getRequiredFieldsForRecord(r){
  let typeFields = [];
  if(r.agravoType === 'grave') typeFields = REQUIRED_GRAVE;
  else if(r.agravoType === 'lerdort') typeFields = REQUIRED_LERDORT;
  else if(r.agravoType === 'mental') typeFields = REQUIRED_MENTAL;
  else if(r.agravoType === 'biologico') typeFields = REQUIRED_BIOLOGICO;
  return [...new Set([...REQUIRED_COMMON, ...typeFields])];
}

function getMissingDataLabels(r){
  const missing = getRequiredFieldsForRecord(r)
    .filter(field => isEmpty(r[field]))
    .map(field => REQUIRED_FIELD_LABELS[field] || field);
  if(r.foiEmitidaCAT === '2') missing.push('Emissão da CAT');
  if(r.agravoType === 'grave'){
    if(isEmpty(r.diagnosticoLesaoCID10) && isEmpty(r.causaCID10)) missing.push('CID ou causa da lesão');
    if(isEmpty(r.investigadorNome)) missing.push('Nome do investigador');
  } else if(r.agravoType === 'lerdort' || r.agravoType === 'mental'){
    if(isEmpty(r.diagnosticoCID10)) missing.push('CID/diagnóstico');
    if(isEmpty(r.investigadorNome)) missing.push('Nome do investigador');
  } else if(r.agravoType === 'biologico' && isEmpty(r.investigadorNome)){
    missing.push('Nome do investigador');
  }
  if(r.status === 'aguardando_investigacao') missing.push('Investigação da ficha');
  return [...new Set(missing)];
}

function normalizeUnidadeSaude(value){
  const raw = String(value || '').trim();
  if(!raw) return 'Não informado';
  const normalized = raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/\s+/g,' ');
  if(normalized.includes('PSMRO') || normalized.includes('PRONTO SOCORRO')) return 'Pronto Socorro (PSMRO)';
  if(/\bUPA\b/.test(normalized)) return 'UPA';
  return raw;
}

function distinctNormalizedUnits(){
  return [...new Set(records.map(r=>normalizeUnidadeSaude(r.unidadeSaude)))].sort((a,b)=>String(a).localeCompare(String(b),'pt-BR'));
}
function limparFiltrosDash(){
  Object.keys(dashFilters).forEach(k=> dashFilters[k]='');
  render();
}
function applyDashFilters(list){
  return list.filter(r=>{
    const d = r.dataNotificacao || '';
    const y = d ? d.slice(0,4) : '';
    const m = d ? d.slice(5,7) : '';
    if(dashFilters.ano && y !== dashFilters.ano) return false;
    if(dashFilters.mes && m !== dashFilters.mes) return false;
    if(dashFilters.periodoIni && (!d || d < dashFilters.periodoIni)) return false;
    if(dashFilters.periodoFim && (!d || d > dashFilters.periodoFim)) return false;
    if(dashFilters.agravo && r.agravoType !== dashFilters.agravo) return false;
    if(dashFilters.unidade && normalizeUnidadeSaude(r.unidadeSaude) !== dashFilters.unidade) return false;
    if(dashFilters.municipio && r.municipioNotificacao !== dashFilters.municipio) return false;
    if(dashFilters.bairro && r.resBairro !== dashFilters.bairro) return false;
    if(dashFilters.ocupacao && !(r.ocupacao||'').toLowerCase().includes(dashFilters.ocupacao.toLowerCase())) return false;
    if(dashFilters.sexo && r.sexo !== dashFilters.sexo) return false;
    if(dashFilters.racaCor && r.racaCor !== dashFilters.racaCor) return false;
    if(dashFilters.escolaridade && r.escolaridade !== dashFilters.escolaridade) return false;
    if(dashFilters.tipoAcidente && r.tipoAcidente !== dashFilters.tipoAcidente) return false;
    if(dashFilters.status && r.status !== dashFilters.status) return false;
    if(dashFilters.obito){
      const ob = isObito(r);
      if(dashFilters.obito==='sim' && !ob) return false;
      if(dashFilters.obito==='nao' && ob) return false;
    }
    return true;
  });
}

function setAnalyticsCardFilter(filter){
  analyticsCardFilter = analyticsCardFilter === filter ? null : filter;
  render();
}

function renderAnalyticsSelection(list, filter){
  if(!filter || !list) return '';
  const title = filter === 'all' ? 'Todas as fichas filtradas' : (AGRAVOS[filter]?.label || 'Fichas selecionadas');
  return `<div class="panel selection-panel analytics-selection-panel">
    <div class="selection-heading"><div><h2>${esc(title)}</h2><div class="selection-hint">Clique em uma ficha para abrir o cadastro completo.</div></div><span class="selection-count">${list.length}</span></div>
    ${renderFichaSelectionList(list)}
  </div>`;
}

function renderAnalytics(){
  const filtered = applyDashFilters(records);
  const total = filtered.length;
  const byType = {};
  Object.keys(AGRAVOS).forEach(k=> byType[k] = filtered.filter(r=>r.agravoType===k).length);
  const analyticsSelected = analyticsCardFilter === 'all' ? filtered : (analyticsCardFilter ? filtered.filter(r=>r.agravoType===analyticsCardFilter) : null);
  const unidades = distinctNormalizedUnits();
  const municipios = distinctValues('municipioNotificacao');
  const bairros = distinctValues('resBairro');
  const anos = [...new Set(records.map(r=>{ const d=r.dataNotificacao || ''; return d? d.slice(0,4):''; }).filter(Boolean))].sort().reverse();

  return `
  <div class="filter-bar">
    <div class="fb-grid">
      <div><label>Ano</label><select id="fAno"><option value="">Todos</option>${anos.map(a=>`<option value="${a}" ${dashFilters.ano===a?'selected':''}>${a}</option>`).join('')}</select></div>
      <div><label>Período inicial</label><input type="date" id="fPerIni" value="${dashFilters.periodoIni}"></div>
      <div><label>Período final</label><input type="date" id="fPerFim" value="${dashFilters.periodoFim}"></div>
      <div><label>Mês</label><select id="fMes"><option value="">Todos</option>${MESES.map((m,i)=>`<option value="${String(i+1).padStart(2,'0')}" ${dashFilters.mes===String(i+1).padStart(2,'0')?'selected':''}>${m}</option>`).join('')}</select></div>
      <div><label>Tipo de Agravo</label><select id="fAgravo"><option value="">Todos</option>${Object.entries(AGRAVOS).map(([k,v])=>`<option value="${k}" ${dashFilters.agravo===k?'selected':''}>${esc(v.label)}</option>`).join('')}</select></div>
      <div><label>Unidade de Notificação</label><select id="fUnidade"><option value="">Todas</option>${unidades.map(u=>`<option value="${esc(u)}" ${dashFilters.unidade===u?'selected':''}>${esc(u)}</option>`).join('')}</select></div>
      <div><label>Município</label><select id="fMunicipio"><option value="">Todos</option>${municipios.map(u=>`<option value="${esc(u)}" ${dashFilters.municipio===u?'selected':''}>${esc(u)}</option>`).join('')}</select></div>
      <div><label>Bairro</label><select id="fBairro"><option value="">Todos</option>${bairros.map(u=>`<option value="${esc(u)}" ${dashFilters.bairro===u?'selected':''}>${esc(u)}</option>`).join('')}</select></div>
      <div><label>Ocupação / CBO</label><input type="text" id="fOcupacao" placeholder="Buscar..." value="${esc(dashFilters.ocupacao)}"></div>
      <div><label>Sexo</label><select id="fSexo"><option value="">Todos</option><option value="M" ${dashFilters.sexo==='M'?'selected':''}>Masculino</option><option value="F" ${dashFilters.sexo==='F'?'selected':''}>Feminino</option><option value="I" ${dashFilters.sexo==='I'?'selected':''}>Ignorado</option></select></div>
      <div><label>Raça/Cor</label><select id="fRaca"><option value="">Todas</option>${Object.entries(RACA_LABELS).map(([k,l])=>`<option value="${k}" ${dashFilters.racaCor===k?'selected':''}>${l}</option>`).join('')}</select></div>
      <div><label>Escolaridade</label><select id="fEscolaridade"><option value="">Todas</option>${Object.entries(ESCOLARIDADE_LABELS).map(([k,l])=>`<option value="${k}" ${dashFilters.escolaridade===k?'selected':''}>${l}</option>`).join('')}</select></div>
      <div><label>Tipo de Acidente</label><select id="fTipoAcidente"><option value="">Todos</option><option value="1" ${dashFilters.tipoAcidente==='1'?'selected':''}>Típico</option><option value="2" ${dashFilters.tipoAcidente==='2'?'selected':''}>Trajeto</option><option value="9" ${dashFilters.tipoAcidente==='9'?'selected':''}>Ignorado</option></select></div>
      <div><label>Status da Investigação</label><select id="fStatus"><option value="">Todos</option>${STATUS_OPTIONS.map(([k,l])=>`<option value="${k}" ${dashFilters.status===k?'selected':''}>${l}</option>`).join('')}</select></div>
      <div><label>Óbito</label><select id="fObito"><option value="">Todos</option><option value="sim" ${dashFilters.obito==='sim'?'selected':''}>Sim</option><option value="nao" ${dashFilters.obito==='nao'?'selected':''}>Não</option></select></div>
    </div>
    <div class="fb-actions"><button class="btn btn-ghost btn-sm" onclick="limparFiltrosDash()">Limpar Filtros</button></div>
  </div>
  ${!records.length ? `<div class="panel"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg><div>Nenhuma notificação cadastrada ainda. Cadastre registros para visualizar o dashboard.</div></div></div>` : `
  <div class="analytics-layout">
      <div class="indicator-col">
      <div class="ind-card total is-clickable ${analyticsCardFilter==='all'?'selected':''}" role="button" tabindex="0" title="Clique para listar todas as fichas filtradas" onclick="setAnalyticsCardFilter('all')"><div class="n">${total}</div><div class="l">Total Geral de Ocorrências</div></div>
      ${Object.entries(AGRAVOS).map(([k,v])=>`
        <div class="ind-card ${k} is-clickable ${analyticsCardFilter===k?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas desta classificação" onclick="setAnalyticsCardFilter('${k}')"><div class="n">${byType[k]}</div><div class="l">${esc(v.label)}</div><div class="pct">${pct(byType[k],total)}% do total</div></div>
      `).join('')}
    </div>
    <div>
      <div class="charts-grid">
        ${renderChartTop5Unidades(filtered)}
        ${renderChartMensal(filtered)}
        ${renderChartStatusInvestigacao(filtered)}
      </div>
      <div class="charts-grid cols-4">
        ${renderChartRaca(filtered)}
        ${renderChartEscolaridade(filtered)}
        ${renderChartTipoAcidente(filtered)}
        ${renderChartPiramide(filtered)}
      </div>
      <div class="charts-grid">
        ${renderChartBodyMap(filtered)}
        ${renderChartOcupacoes(filtered)}
        ${renderChartObitos(filtered)}
      </div>
      </div>
    </div>
    ${renderAnalyticsSelection(analyticsSelected, analyticsCardFilter)}
  `}
  <div class="bm-tooltip" id="bmTooltip"></div>
  `;
}

function renderChartTop5Unidades(list){
  const counts = {};
  list.forEach(r=>{ const u = normalizeUnidadeSaude(r.unidadeSaude); counts[u]=(counts[u]||0)+1; });
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const max = top.length? top[0][1] : 1;
  return `<div class="chart-panel"><h3>Unidade de Saúde</h3>
    ${top.length? top.map(([u,n])=>`<div class="bar-row"><div class="lbl" title="${esc(u)}">${esc(u)}</div><div class="track"><div class="fill" style="width:${(n/max*100)}%;background:var(--primary-2)"></div></div><div class="val">${n} (${pct(n,list.length)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados para os filtros aplicados</div>'}
  </div>`;
}

function renderChartMensal(list){
  const seriesData = {};
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  Object.keys(AGRAVOS).forEach(k=> seriesData[k] = Array(12).fill(0));
  list.forEach(r=>{
    const d = r.dataNotificacao || '';
    if(!d) return;
    const m = parseInt(d.slice(5,7),10);
    if(m>=1 && m<=12 && seriesData[r.agravoType]) seriesData[r.agravoType][m-1]++;
  });
  const maxVal = Math.max(1, ...Object.values(seriesData).flat());
  const W=960, H=230, padL=28, padR=18, padB=38, padT=18;
  const stepX = (W-padL-padR)/11;
  const xFor = i => padL+i*stepX;
  const toY = v => padT + (H-padT-padB) * (1 - v/maxVal);
  const pathFor = arr => arr.map((v,i)=> `${i===0?'M':'L'} ${xFor(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');
  const seriesSvg = Object.entries(seriesData).map(([k,arr])=>{
    const points = arr.map((v,i)=> v ? `<circle cx="${xFor(i).toFixed(1)}" cy="${toY(v).toFixed(1)}" r="2.8" fill="${AGRAVO_HEX[k]}"/><text x="${xFor(i).toFixed(1)}" y="${(toY(v)-6).toFixed(1)}" text-anchor="middle" font-size="8" fill="${AGRAVO_HEX[k]}">${v}</text>` : '').join('');
    return `<path d="${pathFor(arr)}" fill="none" stroke="${AGRAVO_HEX[k]}" stroke-width="2.2"/>${points}`;
  }).join('');
  return `<div class="chart-panel wide wide-monthly"><h3>Quantidade de Acidentes por Mês</h3>
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:230px" role="img" aria-label="Quantidade de acidentes por mês pela data de notificação">
      <line x1="${padL}" y1="${H-padB}" x2="${W-padR}" y2="${H-padB}" stroke="#DCE3E6"/>
      ${seriesSvg}
      ${months.map((m,i)=>`<text x="${xFor(i).toFixed(1)}" y="${H-10}" text-anchor="middle" font-size="8" fill="#64747A">${m}</text>`).join('')}
    </svg>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:2px">
      ${Object.entries(AGRAVOS).map(([k,v])=>`<div class="legend-row" style="margin-bottom:0"><span class="sw" style="background:${AGRAVO_COLORS[k]}"></span><span class="lbl">${esc(v.label)}</span></div>`).join('')}
    </div>
  </div>`;
}

function donutSVG(segments, size, stroke){
  const total = segments.reduce((s,x)=>s+x.value,0) || 1;
  const r = (size-stroke)/2, c = size/2, circumference = 2*Math.PI*r;
  let offset = 0;
  const circles = segments.map(seg=>{
    const frac = seg.value/total;
    const dash = frac*circumference;
    const el = `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${stroke}" stroke-dasharray="${dash.toFixed(1)} ${(circumference-dash).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${c} ${c})"/>`;
    offset += dash;
    return el;
  }).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${circles}<text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="20" font-weight="700" fill="#16262C">${total}</text></svg>`;
}
function renderChartStatusInvestigacao(list){
  const fin = list.filter(r=>r.status==='finalizado').length;
  const agu = list.filter(r=>r.status==='aguardando_investigacao').length;
  const total = list.length;
  return `<div class="chart-panel"><h3>Status de Investigação</h3>
    <div class="donut-wrap">
      ${total? donutSVG([{value:fin,color:'#1B8A72'},{value:agu,color:'#B8791A'}],108,16) : '<div class="empty-mini">Sem dados</div>'}
      <div class="donut-legend">
        <div class="legend-row"><span class="sw" style="background:#1B8A72"></span><span class="lbl">Finalizado</span><span class="val">${fin} (${pct(fin,total)}%)</span></div>
        <div class="legend-row"><span class="sw" style="background:#B8791A"></span><span class="lbl">Aguardando Investigação</span><span class="val">${agu} (${pct(agu,total)}%)</span></div>
      </div>
    </div>
  </div>`;
}
function renderChartRaca(list){
  const counts = {}; Object.keys(RACA_LABELS).forEach(k=> counts[k]=0);
  let naoInformado = 0;
  list.forEach(r=>{ if(r.racaCor && counts[r.racaCor]!==undefined) counts[r.racaCor]++; else naoInformado++; });
  const total = list.length;
  const rows = Object.entries(RACA_LABELS).map(([k,l])=>[l,counts[k]]);
  rows.push(['Não informado', naoInformado]);
  const max = Math.max(1, ...rows.map(r=>r[1]));
  return `<div class="chart-panel"><h3>Raça/Cor</h3>
    ${total? rows.map(([l,n])=>`<div class="bar-row"><div class="lbl">${esc(l)}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:var(--primary-2)"></div></div><div class="val">${n} (${pct(n,total)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados</div>'}
  </div>`;
}
function renderChartEscolaridade(list){
  const counts = {}; Object.keys(ESCOLARIDADE_LABELS).forEach(k=> counts[k]=0);
  let naoInformado = 0;
  list.forEach(r=>{ if(r.escolaridade && counts[r.escolaridade]!==undefined) counts[r.escolaridade]++; else naoInformado++; });
  const total = list.length;
  const rows = Object.entries(ESCOLARIDADE_LABELS).filter(([k])=>counts[k]>0).map(([k,l])=>[l,counts[k]]);
  if(naoInformado) rows.push(['Não informado', naoInformado]);
  const max = Math.max(1, ...rows.map(r=>r[1]));
  return `<div class="chart-panel"><h3>Escolaridade</h3>
    ${total && rows.length? rows.sort((a,b)=>b[1]-a[1]).map(([l,n])=>`<div class="bar-row"><div class="lbl" title="${esc(l)}">${esc(l)}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:var(--accent)"></div></div><div class="val">${n} (${pct(n,total)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados</div>'}
  </div>`;
}
function renderChartTipoAcidente(list){
  const graves = list.filter(r=>r.agravoType==='grave');
  const total = graves.length;
  const counts = {'1':0,'2':0,'9':0,'':0};
  graves.forEach(r=>{ const k = r.tipoAcidente||''; counts[k] = (counts[k]||0)+1; });
  const rows = [['Típico',counts['1']],['Trajeto',counts['2']],['Ignorado',counts['9']],['Não informado',counts['']]].filter(r=>r[1]>0);
  const max = Math.max(1,...rows.map(r=>r[1]));
  return `<div class="chart-panel"><h3>Tipo de Acidente <span style="font-weight:400;text-transform:none;color:var(--text-muted)">(Grave)</span></h3>
    ${total && rows.length? rows.map(([l,n])=>`<div class="bar-row"><div class="lbl">${l}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:${AGRAVO_HEX.grave}"></div></div><div class="val">${n} (${pct(n,total)}%)</div></div>`).join('') : '<div class="empty-mini">Sem registros de Acidente Grave</div>'}
  </div>`;
}
function renderChartPiramide(list){
  const order = ['grave','biologico','mental','lerdort'];
  const counts = order.map(k=> ({k, n: list.filter(r=>r.agravoType===k).length}));
  const max = Math.max(1, ...counts.map(c=>c.n));
  const total = list.length;
  return `<div class="chart-panel"><h3>Pirâmide por Tipo de Agravo</h3>
    <div class="pyramid">
      ${counts.map(c=>`<div class="pyr-row" style="width:${total? (20+ (c.n/max*70)) : 20}%;background:${AGRAVO_HEX[c.k]}">${esc(AGRAVOS[c.k].label)}: ${c.n} (${pct(c.n,total)}%)</div>`).join('')}
    </div>
  </div>`;
}
function computeBodyRegionCounts(list){
  const graves = list.filter(r=> r.agravoType==='grave' && Array.isArray(r.partesCorpo) && r.partesCorpo.length);
  const counts = {}; BODY_REGIONS.forEach(b=> counts[b.key]=0);
  let totalHits = 0;
  graves.forEach(r=>{
    r.partesCorpo.forEach(p=>{
      const region = BODY_REGIONS.find(b=> b.match.includes(p));
      if(region){ counts[region.key]++; totalHits++; }
    });
  });
  return {counts, totalHits};
}
function bodyFigureSVG(view, counts, max){
  const hx = key => { const c=counts[key]||0; const t=c/max; return t>0.66? '#C6423B': t>0.33? '#E0A526' : t>0? '#2E9E6D' : '#E8ECED'; };
  const evt = k => `onmouseenter="showBmTooltip(event,'${k}')" onmouseleave="hideBmTooltip()" onclick="clickBmRegion('${k}')"`;
  if(view==='front'){
    return `<svg width="100" height="210" viewBox="0 0 110 230">
      <rect x="35" y="116" width="40" height="60" rx="10" fill="#F2F5F6" stroke="#DCE3E6"/>
      <rect class="region" data-region="braco" x="8" y="50" width="18" height="80" rx="9" fill="${hx('braco')}" ${evt('braco')}/>
      <rect class="region" data-region="braco" x="84" y="50" width="18" height="80" rx="9" fill="${hx('braco')}" ${evt('braco')}/>
      <circle class="region" data-region="mao" cx="17" cy="136" r="10" fill="${hx('mao')}" ${evt('mao')}/>
      <circle class="region" data-region="mao" cx="93" cy="136" r="10" fill="${hx('mao')}" ${evt('mao')}/>
      <rect class="region" data-region="torax" x="30" y="46" width="50" height="70" rx="12" fill="${hx('torax')}" ${evt('torax')}/>
      <circle class="region" data-region="cabeca" cx="55" cy="26" r="16" fill="${hx('cabeca')}" ${evt('cabeca')}/>
      <circle class="region" data-region="olho" cx="55" cy="26" r="4" fill="${hx('olho')}" ${evt('olho')}/>
    </svg>`;
  }
  return `<svg width="100" height="210" viewBox="0 0 110 230">
    <circle cx="55" cy="26" r="16" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect x="30" y="46" width="50" height="70" rx="12" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect x="8" y="50" width="18" height="80" rx="9" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect x="84" y="50" width="18" height="80" rx="9" fill="#F2F5F6" stroke="#DCE3E6"/>
    <rect class="region" data-region="perna" x="34" y="116" width="18" height="80" rx="9" fill="${hx('perna')}" ${evt('perna')}/>
    <rect class="region" data-region="perna" x="58" y="116" width="18" height="80" rx="9" fill="${hx('perna')}" ${evt('perna')}/>
    <ellipse class="region" data-region="pe" cx="43" cy="205" rx="12" ry="8" fill="${hx('pe')}" ${evt('pe')}/>
    <ellipse class="region" data-region="pe" cx="67" cy="205" rx="12" ry="8" fill="${hx('pe')}" ${evt('pe')}/>
  </svg>`;
}
function renderChartBodyMap(list){
  const {counts, totalHits} = computeBodyRegionCounts(list);
  lastBodyRegionData = {counts, totalHits};
  const max = Math.max(1, ...Object.values(counts));
  return `<div class="chart-panel wide"><h3>Partes do Corpo Atingida <span style="font-weight:400;text-transform:none;color:var(--text-muted)">(Acid. Grave)</span></h3>
    <div class="bodymap-wrap">
      <div>${bodyFigureSVG('front', counts, max)}<div class="bodymap-figure-label">Frente</div></div>
      <div>${bodyFigureSVG('back', counts, max)}<div class="bodymap-figure-label">Costas</div></div>
      <div>
        ${!totalHits? '<div class="empty-mini">Sem registros com parte do corpo atingida</div>' : BODY_REGIONS.map(b=>`
          <div class="bm-legend-item" onmouseenter="showBmTooltip(event,'${b.key}')" onmouseleave="hideBmTooltip()" onclick="clickBmRegion('${b.key}')">
            <span class="region-dot" style="background:${counts[b.key]>0?'#2E9E6D':'#DCE3E6'}"></span>
            <span class="lbl">${esc(b.label)}</span>
            <span class="qty">${counts[b.key]}</span>
            <span class="pct">${pct(counts[b.key], totalHits)}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}
function showBmTooltip(evt, key){
  const region = BODY_REGIONS.find(b=>b.key===key);
  if(!region) return;
  const n = lastBodyRegionData.counts[key]||0;
  const total = lastBodyRegionData.totalHits||0;
  const tip = document.getElementById('bmTooltip');
  if(!tip) return;
  tip.innerHTML = `<b>${esc(region.label)}</b><br>Quantidade: ${n}<br>Percentual: ${pct(n,total)}%`;
  tip.style.display='block';
  tip.style.left = (evt.clientX+14)+'px';
  tip.style.top = (evt.clientY+10)+'px';
}
function hideBmTooltip(){ const tip = document.getElementById('bmTooltip'); if(tip) tip.style.display='none'; }
function clickBmRegion(key){
  const region = BODY_REGIONS.find(b=>b.key===key);
  const n = lastBodyRegionData.counts[key]||0;
  const total = lastBodyRegionData.totalHits||0;
  showToast(`${region.label}: ${n} ocorrência(s) — ${pct(n,total)}% dos registros com parte do corpo atingida informada`);
}
function renderChartOcupacoes(list){
  const counts = {};
  list.forEach(r=>{ const o = r.ocupacao || 'Não informado'; counts[o]=(counts[o]||0)+1; });
  const top = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10);
  const max = Math.max(1, ...top.map(t=>t[1]));
  return `<div class="chart-panel"><h3>Principais Ocupações por Acidente</h3>
    ${top.length? top.map(([o,n])=>`<div class="bar-row"><div class="lbl" title="${esc(o)}">${esc(o)}</div><div class="track"><div class="fill" style="width:${n/max*100}%;background:var(--accent)"></div></div><div class="val">${n} (${pct(n,list.length)}%)</div></div>`).join('') : '<div class="empty-mini">Sem dados</div>'}
  </div>`;
}
function renderChartObitos(list){
  const obitos = list.filter(isObito);
  const total = obitos.length;
  const byType = {};
  Object.keys(AGRAVOS).forEach(k=> byType[k] = obitos.filter(r=>r.agravoType===k).length);
  return `<div class="chart-panel"><h3>Quantidade de Óbitos</h3>
    <div class="obito-panel">
      <div class="big">${total}</div>
      <div class="lbl">${total? 'ÓBITO(S) REGISTRADO(S)' : '0 ÓBITOS REGISTRADOS'}</div>
    </div>
    ${total? `<div style="margin-top:10px">${Object.entries(AGRAVOS).map(([k,v])=> byType[k] ? `<div class="legend-row"><span class="sw" style="background:${AGRAVO_COLORS[k]}"></span><span class="lbl">${esc(v.label)}</span><span class="val">${byType[k]}</span></div>` : '').join('')}</div>` : ''}
  </div>`;
}
function bindAnalyticsEvents(){
  const map = {fAno:'ano', fPerIni:'periodoIni', fPerFim:'periodoFim', fMes:'mes', fAgravo:'agravo', fUnidade:'unidade', fMunicipio:'municipio', fBairro:'bairro', fOcupacao:'ocupacao', fSexo:'sexo', fRaca:'racaCor', fEscolaridade:'escolaridade', fTipoAcidente:'tipoAcidente', fStatus:'status', fObito:'obito'};
  Object.entries(map).forEach(([id,key])=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener(el.tagName==='SELECT' ? 'change' : 'input', e=>{
      dashFilters[key]=e.target.value;
      render();
      if(id==='fOcupacao'){ requestAnimationFrame(()=>{ const f=document.getElementById('fOcupacao'); if(f){ f.focus(); f.selectionStart=f.selectionEnd=f.value.length; } }); }
    });
  });
}

/* ============================= DASHBOARD ============================= */
function setDashboardCardFilter(filter){
  dashboardCardFilter = dashboardCardFilter === filter ? '' : filter;
  render();
}

function renderDashboardSelection(list, filter){
  if(!filter) return '';
  const labels = {all:'Todas as fichas', red:'Fichas com pendência crítica', amber:'Fichas com pendência de atenção', green:'Fichas sem pendências'};
  return `<div class="panel selection-panel">
    <div class="selection-heading"><div><h2>${labels[filter] || 'Fichas selecionadas'}</h2><div class="selection-hint">Clique em uma ficha para abrir o cadastro completo.</div></div><span class="selection-count">${list.length}</span></div>
    ${renderFichaSelectionList(list)}
  </div>`;
}

function renderFichaSelectionList(list){
  if(!list.length) return '<div class="empty-mini">Nenhuma ficha encontrada nesta classificação.</div>';
  return `<div class="selection-list">${list.map(r=>{
    const level = worstLevel(computeAlerts(r));
    const alerts = computeAlerts(r).filter(a=>a.level!=='green');
    return `<div class="selection-item" onclick="goTo('form','${r.id}')">
      <div class="selection-item-main"><span class="selection-ficha">${esc(fichaLabel(r))}</span><b>${esc(r.patientName||'(sem nome)')}</b><span class="selection-agravo">${esc(AGRAVOS[r.agravoType]?.label||'')}</span></div>
      <div class="selection-item-meta"><span class="badge ${level}"><span class="dot ${level}"></span>${level==='red'?'Crítico':level==='amber'?'Atenção':'OK'}</span><span>${fmtDate(r.dataNotificacao)}</span>${alerts.length?`<span>${alerts.length} alerta(s)</span>`:''}</div>
    </div>`;
  }).join('')}</div>`;
}

function renderDashboard(){
  const withAlerts = records.map(r=>({r, alerts:computeAlerts(r), level: null}));
  withAlerts.forEach(x=> x.level = worstLevel(x.alerts));
  const nRed = withAlerts.filter(x=>x.level==='red').length;
  const nAmber = withAlerts.filter(x=>x.level==='amber').length;
  const nGreen = withAlerts.filter(x=>x.level==='green').length;
  const nCatPend = records.filter(r=>r.agravoType==='grave' && r.foiEmitidaCAT==='2').length;

  if(!records.length){
    return `<div class="panel"><div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v3M16 3v3"/></svg>
      <div>Nenhuma notificação registrada ainda.</div>
      <button class="btn btn-primary" style="margin-top:14px" onclick="goTo('form')">Criar primeiro registro</button>
    </div></div>`;
  }

  const alertCards = withAlerts.filter(x=>x.level!=='green')
    .sort((a,b)=> (a.level==='red'?0:1)-(b.level==='red'?0:1)).map(x=>{
      const missing = getMissingDataLabels(x.r);
      return `<div class="alert-card ${x.level}" onclick="goTo('form','${x.r.id}')">
        <div class="alert-card-main">
          <span class="dot ${x.level}"></span>
          <div class="alert-card-content">
            <div class="alert-card-head"><span class="alert-card-ficha">Nº da Ficha: ${esc(fichaLabel(x.r))}</span><span class="alert-card-type">${esc(AGRAVOS[x.r.agravoType]?.label||'')}</span></div>
            <div class="alert-card-name">${esc(x.r.patientName||'(sem nome)')}</div>
            <div class="alert-card-sub">Dados pendentes nesta ficha:</div>
            <ul class="alert-missing">${missing.length ? missing.map(item=>`<li>${esc(item)}</li>`).join('') : '<li>Verificar pendências do registro</li>'}</ul>
          </div>
          <span class="alert-card-open">Abrir ficha&nbsp; →</span>
        </div>
      </div>`;
    });

  const dashboardSelection = dashboardCardFilter === 'all' ? records : withAlerts.filter(x=>x.level===dashboardCardFilter).map(x=>x.r);

  return `
    <div class="grid-stats">
      <div class="stat-card primary is-clickable ${dashboardCardFilter==='all'?'selected':''}" role="button" tabindex="0" title="Clique para listar todas as fichas" onclick="setDashboardCardFilter('all')"><div class="n">${records.length}</div><div class="l">Total de registros</div></div>
      <div class="stat-card red is-clickable ${dashboardCardFilter==='red'?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas com pendência crítica" onclick="setDashboardCardFilter('red')"><div class="n">${nRed}</div><div class="l">Com pendência crítica</div></div>
      <div class="stat-card amber is-clickable ${dashboardCardFilter==='amber'?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas com pendência de atenção" onclick="setDashboardCardFilter('amber')"><div class="n">${nAmber}</div><div class="l">Com pendência de atenção</div></div>
      <div class="stat-card green is-clickable ${dashboardCardFilter==='green'?'selected':''}" role="button" tabindex="0" title="Clique para listar as fichas sem pendências" onclick="setDashboardCardFilter('green')"><div class="n">${nGreen}</div><div class="l">Sem pendências</div></div>
    </div>
    ${renderDashboardSelection(dashboardSelection, dashboardCardFilter)}
    <div class="panel">
      <h2><span class="dot red"></span> Alertas ativos ${nCatPend? `<span style="font-weight:400;color:var(--text-muted);font-size:12px">— ${nCatPend} CAT não emitida(s)</span>`:''}</h2>
      ${alertCards.length ? alertCards.join('') : '<div style="color:var(--text-muted);font-size:13px">Nenhum alerta ativo. Todos os registros estão em dia.</div>'}
    </div>
    <div class="panel">
      <h2>Registros recentes</h2>
      ${renderMiniTable(records.slice().sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6))}
    </div>
  `;
}
function renderMiniTable(list){
  if(!list.length) return '<div style="color:var(--text-muted);font-size:13px">Sem registros.</div>';
  return `<table><thead><tr><th>Nome</th><th>Agravo</th><th>Data</th><th>Status</th><th></th></tr></thead><tbody>
    ${list.map(r=>{
      const level = worstLevel(computeAlerts(r));
      return `<tr>
        <td>${esc(r.patientName||'—')}</td>
        <td>${esc(AGRAVOS[r.agravoType]?.label||'—')}</td>
        <td>${fmtDate(r.dataNotificacao)}</td>
        <td><span class="badge ${level}"><span class="dot ${level}"></span>${level==='red'?'Crítico':level==='amber'?'Atenção':'OK'}</span></td>
        <td><button class="btn btn-ghost btn-sm" onclick="goTo('form','${r.id}')">Abrir</button></td>
      </tr>`;
    }).join('')}
  </tbody></table>`;
}

/* ============================= CONSULTA ============================= */
function getFilteredRecords(){
  let list = records.slice();
  const s = tableState.search.trim().toLowerCase();
  if(s) list = list.filter(r => (r.patientName||'').toLowerCase().includes(s) || (r.municipioNotificacao||'').toLowerCase().includes(s) || (r.nomeEmpresa||'').toLowerCase().includes(s));
  if(tableState.filterAgravo) list = list.filter(r=> r.agravoType === tableState.filterAgravo);
  if(tableState.filterStatus) list = list.filter(r=> worstLevel(computeAlerts(r)) === tableState.filterStatus);
  if(tableState.filterSituacao) list = list.filter(r=> r.status === tableState.filterSituacao);
  list.sort((a,b)=>{
    let va = a[tableState.sortKey]||''; let vb = b[tableState.sortKey]||'';
    return (va > vb ? 1 : va < vb ? -1 : 0) * tableState.sortDir;
  });
  return list;
}
function renderConsulta(){
  const all = getFilteredRecords();
  const totalPages = Math.max(1, Math.ceil(all.length / tableState.pageSize));
  tableState.page = Math.min(tableState.page, totalPages);
  const pageItems = all.slice((tableState.page-1)*tableState.pageSize, tableState.page*tableState.pageSize);
  const sortIcon = k => tableState.sortKey===k ? (tableState.sortDir===1?' ▲':' ▼') : '';

  return `
  <div class="panel">
    <div class="toolbar">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="searchInput" placeholder="Buscar por nome, município ou empresa..." value="${esc(tableState.search)}">
      </div>
      <select id="filterAgravo">
        <option value="">Todos os agravos</option>
        ${Object.entries(AGRAVOS).map(([k,v])=>`<option value="${k}" ${tableState.filterAgravo===k?'selected':''}>${v.label}</option>`).join('')}
      </select>
      <select id="filterSituacao">
        <option value="">Todas as situações</option>
        ${STATUS_OPTIONS.map(([k,l])=>`<option value="${k}" ${tableState.filterSituacao===k?'selected':''}>${esc(l)}</option>`).join('')}
      </select>
      <select id="filterStatus">
        <option value="">Todos os alertas</option>
        <option value="red" ${tableState.filterStatus==='red'?'selected':''}>Crítico</option>
        <option value="amber" ${tableState.filterStatus==='amber'?'selected':''}>Atenção</option>
        <option value="green" ${tableState.filterStatus==='green'?'selected':''}>OK</option>
      </select>
      <button class="btn btn-ghost btn-sm" onclick="exportExcel()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>
        Exportar Excel
      </button>
    </div>
    ${all.length ? `<table>
      <thead><tr>
        <th data-sort="fichaNumero">Nº da Ficha${sortIcon('fichaNumero')}</th>
        <th data-sort="patientName">Nome${sortIcon('patientName')}</th>
        <th data-sort="agravoType">Agravo${sortIcon('agravoType')}</th>
        <th data-sort="dataNotificacao">Data Notif.${sortIcon('dataNotificacao')}</th>
        <th data-sort="municipioNotificacao">Município${sortIcon('municipioNotificacao')}</th>
        <th data-sort="status">Situação${sortIcon('status')}</th>
        <th>Alertas</th>
        <th style="text-align:right">Ações</th>
      </tr></thead>
      <tbody>
        ${pageItems.map(r=>{
          const level = worstLevel(computeAlerts(r));
          const statusLabel = (STATUS_OPTIONS.find(s=>s[0]===r.status)||[,'—'])[1];
          return `<tr>
            <td style="font-family:var(--font-mono);color:var(--text-muted)">${esc(fichaLabel(r))}</td>
            <td><b>${esc(r.patientName||'—')}</b></td>
            <td>${esc(AGRAVOS[r.agravoType]?.label||'—')}</td>
            <td>${fmtDate(r.dataNotificacao)}</td>
            <td>${esc(r.municipioNotificacao||'—')}</td>
            <td><span class="badge ${r.status==='finalizado'?'green':'amber'}">${esc(statusLabel)}</span></td>
            <td><span class="badge ${level}"><span class="dot ${level}"></span>${level==='red'?'Crítico':level==='amber'?'Atenção':'OK'}</span></td>
            <td><div class="row-actions" style="justify-content:flex-end">
              <button class="btn-icon" title="Visualizar" onclick="goTo('print','${r.id}')">${iconEye()}</button>
              <button class="btn-icon" title="Editar" onclick="goTo('form','${r.id}')">${iconEdit()}</button>
              <button class="btn-icon" title="Duplicar" onclick="duplicateRecord('${r.id}')">${iconCopy()}</button>
              <button class="btn-icon" title="Imprimir" onclick="printRecord('${r.id}')">${iconPrint()}</button>
              <button class="btn-icon" title="Excluir" onclick="askDelete('${r.id}')">${iconTrash()}</button>
            </div></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div class="pagination">
      <div>${all.length} registro(s) — página ${tableState.page} de ${totalPages}</div>
      <div class="pages">
        <button ${tableState.page<=1?'disabled':''} onclick="changePage(${tableState.page-1})">‹</button>
        ${Array.from({length:totalPages},(_,i)=>i+1).slice(0,6).map(p=>`<button class="${p===tableState.page?'active':''}" onclick="changePage(${p})">${p}</button>`).join('')}
        <button ${tableState.page>=totalPages?'disabled':''} onclick="changePage(${tableState.page+1})">›</button>
      </div>
    </div>
    ` : `<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><div>Nenhum registro encontrado para os filtros aplicados.</div></div>`}
  </div>
  ${pendingDeleteId ? renderDeleteModal() : ''}
  `;
}
function iconEye(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`;}
function iconEdit(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;}
function iconCopy(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`;}
function iconPrint(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`;}
function iconTrash(){return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>`;}

function renderDeleteModal(){
  const r = records.find(x=>x.id===pendingDeleteId);
  return `<div class="modal-bg" onclick="if(event.target===this) cancelDelete()">
    <div class="modal">
      <h3>Excluir registro?</h3>
      <p>Isso removerá permanentemente a ficha de <b>${esc(r?.patientName||'este registro')}</b>. Essa ação não pode ser desfeita.</p>
      <div class="row">
        <button class="btn btn-ghost" onclick="cancelDelete()">Cancelar</button>
        <button class="btn btn-primary" style="background:var(--red)" onclick="confirmDelete()">Excluir</button>
      </div>
    </div>
  </div>`;
}
function askDelete(id){ pendingDeleteId=id; render(); }
function cancelDelete(){ pendingDeleteId=null; render(); }
async function confirmDelete(){
  const idToDelete = pendingDeleteId;
  const backup = records.find(r=>r.id===idToDelete);
  records = records.filter(r=>r.id!==idToDelete);
  pendingDeleteId=null;
  render();
  const ok = await deleteRecordRemote(idToDelete);
  if(ok){
    showToast('Registro excluído.');
  } else {
    if(backup) records.push(backup);
    render();
    showToast('Erro: não foi possível excluir no banco de dados. Verifique a conexão e tente novamente.');
  }
}
async function duplicateRecord(id){
  const orig = records.find(r=>r.id===id);
  if(!orig) return;
  const copy = {...orig, id: uid(), fichaNumero: '', patientName: orig.patientName + ' (cópia)', createdAt: new Date().toISOString()};
  records.push(copy);
  render();
  const ok = await upsertRecordRemote(copy);
  if(ok){
    showToast('Registro duplicado. Informe o novo Nº da Ficha.');
  } else {
    records = records.filter(r=>r.id!==copy.id);
    render();
    showToast('Erro: não foi possível duplicar no banco de dados. Verifique a conexão e tente novamente.');
  }
}
function printRecord(id){
  goTo('print', id);
  setTimeout(()=>{
    try{ window.print(); }
    catch(e){ showToast('Abra o arquivo em uma aba do navegador para imprimir.'); }
  }, 200);
}
function changePage(p){ tableState.page = p; render(); }
function bindConsultaEvents(){
  const si = document.getElementById('searchInput');
  if(si) si.addEventListener('input', e=>{ tableState.search=e.target.value; tableState.page=1; render(); si_focus(); });
  const fa = document.getElementById('filterAgravo');
  if(fa) fa.addEventListener('change', e=>{ tableState.filterAgravo=e.target.value; tableState.page=1; render(); });
  const fst = document.getElementById('filterSituacao');
  if(fst) fst.addEventListener('change', e=>{ tableState.filterSituacao=e.target.value; tableState.page=1; render(); });
  const fs = document.getElementById('filterStatus');
  if(fs) fs.addEventListener('change', e=>{ tableState.filterStatus=e.target.value; tableState.page=1; render(); });
  document.querySelectorAll('th[data-sort]').forEach(th=>{
    th.addEventListener('click', ()=>{
      const k = th.dataset.sort;
      if(tableState.sortKey===k) tableState.sortDir *= -1; else { tableState.sortKey=k; tableState.sortDir=1; }
      render();
    });
  });
}
function si_focus(){
  requestAnimationFrame(()=>{ const el=document.getElementById('searchInput'); if(el){ el.focus(); el.selectionStart=el.selectionEnd=el.value.length; } });
}
/* ============================= EXPORTAÇÃO EXCEL (POR TIPO DE AGRAVO) ============================= */
function labelOf(options, code){
  if(code===undefined || code===null || code==='') return '';
  const o = (options||[]).find(x=>x[0]===code);
  return o ? o[1] : code;
}
function arrJoin(v){ return Array.isArray(v) ? v.join('; ') : (v||''); }

const SIM_NAO_IGN = [['1','Sim'],['2','Não'],['9','Ignorado']];
const CAT_OPTIONS = [['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']];
const REGIME_TRAT_OPTIONS = [['1','Hospitalar'],['2','Ambulatorial'],['3','Ambos'],['9','Ignorado']];
const REGIME_TRAT_LD_OPTIONS = [['1','Hospitalar'],['2','Ambulatorial']];
const EVOLUCAO_DOENCA_OPTIONS = [['1','Cura'],['2','Cura não confirmada'],['3','Incapacidade Temporária'],['4','Incapacidade Permanente Parcial'],['5','Incapacidade Permanente Total'],['6','Óbito por doença relacionada ao trabalho'],['7','Óbito por Outra Causa'],['8','Outro'],['9','Ignorado']];

const EXPORT_COMMON_COLS = [
  ['Nº da Ficha', r=>fichaLabel(r)],
  ['Nº do SINAN', r=>r.numeroSinan||''],
  ['Unidade de Saúde (Notificadora)', r=>r.unidadeSaude||''],
  ['Data da Notificação', r=>fmtDate(r.dataNotificacao)],
  ['Data do Acidente', r=>fmtDate(r.dataAcidente)],
  ['Data de Lançamento', r=>fmtDate(r.dataLancamento)],
  ['Município de Notificação', r=>r.municipioNotificacao||''],
  ['UF de Notificação', r=>r.ufNotificacao||''],
  ['Status', r=>labelOf(STATUS_OPTIONS, r.status)],
  ['Nome do Paciente', r=>r.patientName||''],
  ['Nome da Mãe', r=>r.motherName||''],
  ['Data de Nascimento', r=>fmtDate(r.dataNascimento)],
  ['Idade', r=>{const a=calcIdade(r.dataNascimento); return a!=null?a:'';}],
  ['Faixa Etária', r=>{const a=calcIdade(r.dataNascimento); return a!=null?faixaEtaria(a):'';}],
  ['Sexo', r=>labelOf([['M','Masculino'],['F','Feminino'],['I','Ignorado']], r.sexo)],
  ['Raça/Cor', r=>labelOf([['1','Branca'],['2','Preta'],['3','Amarela'],['4','Parda'],['5','Indígena'],['9','Ignorado']], r.racaCor)],
  ['Escolaridade', r=>labelOf([['0','Analfabeto'],['1','1ª a 4ª série incompleta do EF'],['2','4ª série completa do EF'],['3','5ª a 8ª série incompleta do EF'],['4','Ensino fundamental completo'],['5','Ensino médio incompleto'],['6','Ensino médio completo'],['7','Educação superior incompleta'],['8','Educação superior completa'],['9','Ignorado'],['10','Não se aplica']], r.escolaridade)],
  ['Gestante', r=>labelOf([['1','1º Trimestre'],['2','2º Trimestre'],['3','3º Trimestre'],['4','Idade gestacional ignorada'],['5','Não'],['6','Não se aplica'],['9','Ignorado']], r.gestante)],
  ['Cartão SUS', r=>r.cartaoSus||''],
  ['UF de Residência', r=>r.resUf||''],
  ['Município de Residência', r=>r.resMunicipio||''],
  ['Distrito (Residência)', r=>r.resDistrito||''],
  ['Bairro (Residência)', r=>r.resBairro||''],
  ['Logradouro', r=>r.resLogradouro||''],
  ['Número (Residência)', r=>r.resNumero||''],
  ['Complemento', r=>r.resComplemento||''],
  ['CEP', r=>r.resCep||''],
  ['Zona', r=>labelOf([['1','Urbana'],['2','Rural'],['3','Periurbana'],['9','Ignorado']], r.resZona)],
  ['Ponto de Referência (Residência)', r=>r.resPontoReferencia||''],
  ['Telefone (Residência)', r=>r.resTelefone||''],
  ['País', r=>r.resPais||''],
  ['Ocupação (CBO)', r=>r.ocupacao||''],
  ['Situação no Mercado de Trabalho', r=>labelOf([['01','Empregado registrado com carteira assinada'],['02','Empregado não registrado'],['03','Autônomo/conta própria'],['04','Servidor público estatutário'],['05','Servidor público celetista'],['06','Aposentado'],['07','Desempregado'],['08','Trabalho temporário'],['09','Cooperativado'],['10','Trabalhador avulso'],['11','Empregador'],['12','Outros'],['99','Ignorado']], r.situacaoMercado)],
  ['Tempo de Trabalho na Ocupação', r=>r.tempoTrabalhoOcupacao||''],
  ['CNPJ/CPF (Empresa)', r=>r.cnpjCpf||''],
  ['Nome da Empresa/Empregador', r=>r.nomeEmpresa||''],
  ['CNAE', r=>r.cnae||''],
  ['UF (Empresa)', r=>r.empUf||''],
  ['Município (Empresa)', r=>r.empMunicipio||''],
  ['Distrito (Empresa)', r=>r.empDistrito||''],
  ['Bairro (Empresa)', r=>r.empBairro||''],
  ['Endereço (Empresa)', r=>r.empEndereco||''],
  ['Número (Empresa)', r=>r.empNumero||''],
  ['Ponto de Referência (Empresa)', r=>r.empPontoReferencia||''],
  ['Telefone (Empresa)', r=>r.empTelefone||''],
  ['Empregador Terceirizado', r=>labelOf(CAT_OPTIONS, r.empregadorTerceirizada)],
];

const GRAVE_COLS = [
  ['Local do Acidente', r=>labelOf([['1','Instalações do contratante'],['2','Via pública'],['3','Instalações de terceiros'],['4','Domicílio próprio'],['9','Ignorado']], r.localAcidente)],
  ['CNAE Empresa Principal', r=>r.cnaeEmpresaPrincipal||''],
  ['CNPJ Empresa Principal', r=>r.cnpjEmpresaPrincipal||''],
  ['Razão Social Empresa Principal', r=>r.razaoSocialEmpresaPrincipal||''],
  ['Hora do Acidente', r=>r.horaAcidente||''],
  ['Horas Após Início da Jornada', r=>r.horasAposInicioJornada||''],
  ['UF de Ocorrência', r=>r.ufOcorrencia||''],
  ['Município de Ocorrência', r=>r.municipioOcorrencia||''],
  ['Causa do Acidente (CID-10)', r=>r.causaCID10||''],
  ['Tipo de Acidente', r=>labelOf([['1','Típico'],['2','Trajeto'],['9','Ignorado']], r.tipoAcidente)],
  ['Outros Trabalhadores Atingidos', r=>labelOf(SIM_NAO_IGN, r.houveOutrosTrabalhadores)],
  ['Quantos Trabalhadores', r=>r.quantosTrabalhadores||''],
  ['Ocorreu Atendimento Médico', r=>labelOf(SIM_NAO_IGN, r.ocorreuAtendimentoMedico)],
  ['Data do Atendimento', r=>fmtDate(r.dataAtendimento)],
  ['UF do Atendimento', r=>r.ufAtendimento||''],
  ['Município do Atendimento', r=>r.municipioAtendimento||''],
  ['Unidade de Atendimento', r=>r.nomeUnidadeAtendimento||''],
  ['Partes do Corpo Atingidas', r=>arrJoin(r.partesCorpo)],
  ['Diagnóstico da Lesão (CID-10)', r=>r.diagnosticoLesaoCID10||''],
  ['Regime de Tratamento', r=>labelOf(REGIME_TRAT_OPTIONS, r.regimeTratamento)],
  ['Evolução do Caso', r=>labelOf([['1','Cura'],['2','Incapacidade temporária'],['3','Incapacidade parcial permanente'],['4','Incapacidade total permanente'],['5','Óbito por acidente de trabalho grave'],['6','Óbito por outras causas'],['7','Outro'],['9','Ignorado']], r.evolucaoCaso)],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Descrição Sumária', r=>r.descricaoSumaria||''],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

const LERDORT_COLS = [
  ['Data do Diagnóstico', r=>fmtDate(r.dataDiagnosticoLD)],
  ['Tempo de Exposição ao Risco', r=>r.tempoExposicaoRiscoLD||''],
  ['Regime de Tratamento', r=>labelOf(REGIME_TRAT_LD_OPTIONS, r.regimeTratamentoLD)],
  ['Agravos Associados', r=>arrJoin(r.agravosAssociados)],
  ['Outros Agravos Associados', r=>r.agravosAssociadosOutras||''],
  ['Sinais e Sintomas', r=>arrJoin(r.sinaisSintomas)],
  ['Outro Sinal/Sintoma', r=>r.sinaisSintomasOutro||''],
  ['Limitação/Incapacidade', r=>labelOf(SIM_NAO_IGN, r.limitacaoIncapacidade)],
  ['Exposição no Trabalho', r=>arrJoin(r.exposicaoTrabalho)],
  ['Diagnóstico Específico (CID-10)', r=>r.diagnosticoCID10||''],
  ['Houve Afastamento para Tratamento', r=>labelOf(SIM_NAO_IGN, r.houveAfastamentoTratamento)],
  ['Tempo de Afastamento', r=>r.tempoAfastamentoTrabalho||''],
  ['Evolução com Afastamento', r=>labelOf([['1','Melhora'],['2','Piora'],['9','Ignorado']], r.evolucaoComAfastamento)],
  ['Outros Trabalhadores com Mesma Doença', r=>labelOf(SIM_NAO_IGN, r.outrosTrabalhadoresMesmaDoenca)],
  ['Conduta Geral', r=>arrJoin(r.condutaGeral)],
  ['Outra Conduta', r=>r.condutaGeralOutros||''],
  ['Evolução do Caso', r=>labelOf(EVOLUCAO_DOENCA_OPTIONS, r.evolucaoCaso)],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

const MENTAL_COLS = [
  ['Data do Diagnóstico', r=>fmtDate(r.dataDiagnosticoMental)],
  ['Tempo de Exposição ao Risco', r=>r.tempoExposicaoRiscoMental||''],
  ['Regime de Tratamento', r=>labelOf(REGIME_TRAT_LD_OPTIONS, r.regimeTratamentoMental)],
  ['Diagnóstico Específico (CID-10)', r=>r.diagnosticoCID10||''],
  ['Hábitos', r=>arrJoin(r.habitos)],
  ['Hábito de Fumar', r=>labelOf([['1','Sim'],['2','Não'],['3','Ex-fumante'],['9','Ignorado']], r.habitoFumar)],
  ['Tempo de Exposição ao Tabaco', r=>r.tempoExposicaoTabaco||''],
  ['Conduta Geral', r=>arrJoin(r.condutaGeralMental)],
  ['Outra Conduta', r=>r.condutaGeralMentalOutros||''],
  ['Afastamento do Local de Trabalho', r=>labelOf(SIM_NAO_IGN, r.afastamentoLocalTrabalhoMental)],
  ['Outros Trabalhadores com Mesma Doença', r=>labelOf(SIM_NAO_IGN, r.outrosTrabalhadoresMesmaDoenca)],
  ['Encaminhado a CAPS', r=>labelOf(SIM_NAO_IGN, r.encaminhadoCAPS)],
  ['Evolução do Caso', r=>labelOf(EVOLUCAO_DOENCA_OPTIONS, r.evolucaoCaso)],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

const BIOLOGICO_COLS = [
  ['Data do Acidente', r=>fmtDate(r.dataAcidenteBio)],
  ['Tipo de Exposição', r=>arrJoin(r.tipoExposicao)],
  ['Outro Tipo de Exposição', r=>r.tipoExposicaoOutro||''],
  ['Material Orgânico', r=>labelOf([['1','Sangue'],['2','Líquor'],['3','Líquido pleural'],['4','Líquido ascítico'],['5','Líquido amniótico'],['6','Fluido com sangue'],['7','Soro/plasma'],['8','Outros'],['9','Ignorado']], r.materialOrganico)],
  ['Outro Material Orgânico', r=>r.materialOrganicoOutro||''],
  ['Circunstância do Acidente', r=>labelOf([['01','Administração de medicação endovenosa'],['02','Administração de medicação intramuscular'],['03','Administração de medicação subcutânea'],['04','Administração de medicação intradérmica'],['05','Punção venosa/arterial para coleta de sangue'],['06','Punção venosa/arterial não especificada'],['07','Descarte inadequado de material perfurocortante em bancada, cama, chão etc.'],['08','Descarte inadequado de material perfurocortante em saco de lixo'],['09','Lavanderia'],['10','Lavagem de material'],['11','Manipulação de caixa com material perfurocortante'],['12','Procedimento cirúrgico'],['13','Procedimento odontológico'],['14','Procedimento laboratorial'],['15','Dextro'],['16','Reencape'],['98','Outros'],['99','Ignorado']], r.circunstanciaAcidente)],
  ['Agente', r=>labelOf([['1','Agulha com lúmen (luz)'],['2','Agulha sem lúmen/maciça'],['3','Intracath'],['4','Vidros'],['5','Lâmina/lanceta (qualquer tipo)'],['9','Ignorado']], r.agenteBiologico)],
  ['Uso de EPI', r=>arrJoin(r.usoEPI)],
  ['Outro EPI', r=>r.usoEPIOutro||''],
  ['Situação Vacinal Hepatite B', r=>labelOf([['1','Vacinado'],['2','Não vacinado'],['9','Ignorado']], r.situacaoVacinalHepB)],
  ['Anti-HIV', r=>labelOf(RESULT_EXAME_OPTIONS, r.examAntiHIV)],
  ['HbsAg', r=>labelOf(RESULT_EXAME_OPTIONS, r.examHbsAg)],
  ['Anti-HBs', r=>labelOf(RESULT_EXAME_OPTIONS, r.examAntiHBs)],
  ['Anti-HCV', r=>labelOf(RESULT_EXAME_OPTIONS, r.examAntiHCV)],
  ['Paciente Fonte Conhecida', r=>labelOf(SIM_NAO_IGN, r.pacienteFonteConhecida)],
  ['Fonte — HbsAg', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteHbsAg)],
  ['Fonte — Anti-HBc', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteAntiHBc)],
  ['Fonte — Anti-HIV', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteAntiHIV)],
  ['Fonte — Anti-HCV', r=>labelOf(RESULT_EXAME_OPTIONS, r.fonteAntiHCV)],
  ['Conduta no Momento do Acidente', r=>arrJoin(r.condutaMomentoAcidente)],
  ['Outro Esquema ARV', r=>r.outroEsquemaARV||''],
  ['Evolução do Caso', r=>labelOf([['1','Alta com conversão sorológica'],['2','Alta sem conversão sorológica'],['3','Alta paciente fonte negativo'],['4','Abandono'],['5','Óbito por acidente com exposição a material biológico'],['6','Óbito por Outra Causa'],['9','Ignorado']], r.evolucaoCaso)],
  ['Se Conversão Sorológica, Vírus', r=>r.especificarVirus||''],
  ['Data do Óbito', r=>fmtDate(r.dataObito)],
  ['CAT Emitida', r=>labelOf(CAT_OPTIONS, r.foiEmitidaCAT)],
  ['Informações Complementares', r=>r.informacoesComplementares||''],
  ['Município/Unidade do Investigador', r=>r.investigadorMunicipioUnidade||''],
  ['Código da Unidade de Saúde', r=>r.codUnidadeSaude||''],
  ['Nome do Investigador', r=>r.investigadorNome||''],
  ['Função do Investigador', r=>r.investigadorFuncao||''],
  ['Assinatura', r=>r.investigadorAssinatura||''],
];

function exportExcel(){
  const list = getFilteredRecords();
  if(!list.length){ showToast('Nada para exportar.'); return; }
  if(typeof XLSX === 'undefined'){ showToast('Não foi possível carregar a biblioteca de exportação. Verifique sua conexão com a internet.'); return; }
  const sheetsDef = [
    {key:'grave', name:'Acidente Grave', cols: GRAVE_COLS},
    {key:'biologico', name:'Exposição Biológica', cols: BIOLOGICO_COLS},
    {key:'mental', name:'Transtorno Mental', cols: MENTAL_COLS},
    {key:'lerdort', name:'LER-DORT', cols: LERDORT_COLS},
  ];
  const wb = XLSX.utils.book_new();
  let anySheet = false;
  sheetsDef.forEach(sd=>{
    const recs = list.filter(r=>r.agravoType===sd.key);
    const allCols = [...EXPORT_COMMON_COLS, ...sd.cols];
    const header = allCols.map(c=>c[0]);
    const data = recs.map(r => allCols.map(c => { const v = c[1](r); return (v===undefined||v===null) ? '' : v; }));
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    ws['!cols'] = header.map(()=>({wch:24}));
    XLSX.utils.book_append_sheet(wb, ws, sd.name);
    if(recs.length) anySheet = true;
  });
  if(!anySheet){ showToast('Nenhum registro nos tipos de agravo disponíveis para exportação.'); }
  XLSX.writeFile(wb, 'notificacoes_acidentes_trabalho.xlsx');
  showToast('Excel exportado com sucesso.');
}

/* ============================= FORMULÁRIO ============================= */
function field(opts){
  const {num, label, key, type='text', required=false, span='', options=null, hint=''} = opts;
  const val = formData[key] ?? '';
  const invalid = required && !val;
  let input = '';
  if(type==='select'){
    input = `<select data-k="${key}" ${required?'required':''}>
      <option value="">Selecione...</option>
      ${options.map(o=>`<option value="${o[0]}" ${val===o[0]?'selected':''}>${esc(o[1])}</option>`).join('')}
    </select>`;
  } else if(type==='textarea'){
    input = `<textarea data-k="${key}" rows="3">${esc(val)}</textarea>`;
  } else {
    input = `<input type="${type}" data-k="${key}" value="${esc(val)}" ${required?'required':''}>`;
  }
  return `<div class="field ${span} ${invalid?'invalid':''}">
    <label>${num?`<span class="num">${num}.</span>`:''}${esc(label)} ${required?'<span class="req">*</span>':''}</label>
    ${input}
    ${hint?`<span class="hint">${esc(hint)}</span>`:''}
  </div>`;
}
function autocompleteField(opts){
  const {num, label, key, db, required=false, hint} = opts;
  const val = formData[key] ?? '';
  return `<div class="field span2 autocomplete">
    <label>${num?`<span class="num">${num}.</span>`:''}${esc(label)} ${required?'<span class="req">*</span>':''}</label>
    <input type="text" data-k="${key}" data-ac="${db}" value="${esc(val)}" placeholder="Digite o código ou a descrição..." autocomplete="off">
    <div class="ac-list" id="ac-${key}"></div>
    ${hint?`<span class="hint">${esc(hint)}</span>`:''}
  </div>`;
}
function checkboxGroup(opts){
  const {num, label, key, options} = opts;
  const val = Array.isArray(formData[key]) ? formData[key] : [];
  return `<div class="field full">
    <label>${num?`<span class="num">${num}.</span>`:''}${esc(label)}</label>
    <div class="checkbox-list" style="flex-direction:row;flex-wrap:wrap;gap:14px">
      ${options.map(o=>`<label><input type="checkbox" data-ck="${key}" value="${o}" ${val.includes(o)?'checked':''}> ${esc(o)}</label>`).join('')}
    </div>
  </div>`;
}

function renderForm(){
  const type = formData.agravoType || 'grave';
  const impl = AGRAVOS[type]?.implemented;
  return `
    <div class="stepper">
      <div class="step ${formPage===1?'active':''}" onclick="switchPage(1)">1. Dados Comuns da Notificação</div>
      <div class="step ${formPage===2?'active':''} ${!impl?'disabled':''}" onclick="${impl?'switchPage(2)':''}">2. Questionário Específico — ${esc(AGRAVOS[type]?.label||'')}</div>
    </div>
    <form id="mainForm">
      ${formPage===1 ? renderPage1() : renderPage2(type)}
      <div class="form-actions no-print">
        <button type="button" class="btn btn-ghost" onclick="goTo('consulta')">Cancelar</button>
        <div style="display:flex;gap:8px">
          ${formPage===2?'<button type="button" class="btn btn-ghost" onclick="switchPage(1)">Voltar</button>':''}
          ${formPage===1 && impl ? `<button type="button" class="btn btn-primary" onclick="switchPage(2)">Avançar para Página 2</button>` : ''}
          <button type="button" class="btn btn-primary" id="saveRecordBtn" onclick="saveRecord()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            Salvar Registro
          </button>
        </div>
      </div>
    </form>
  `;
}
function switchPage(p){
  syncFormFromDOM();
  formPage = p;
  render();
}
function renderPage1(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Tipo de agravo (define a página 2)</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${Object.entries(AGRAVOS).map(([k,v])=>`
          <div class="type-pill ${formData.agravoType===k?'selected':''} ${!v.implemented?'soon':''}" onclick="${v.implemented || formData.agravoType!==k ? `selectAgravo('${k}')`:''}">
            ${esc(v.label)} ${!v.implemented?'<span class="soon-tag">Em breve</span>':''}
          </div>`).join('')}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Controle da Ficha</div>
      <div class="field-grid">
        ${field({num:'', label:'Nº da Ficha', key:'fichaNumero', hint:'Preenchimento manual'})}
        ${field({num:'', label:'Data de Lançamento', key:'dataLancamento', type:'date'})}
        ${field({num:'', label:'Status', key:'status', type:'select', required:true, options: STATUS_OPTIONS})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Notificação Individual</div>
      <div class="field-grid">
        ${field({num:'', label:'Unidade de Saúde (ou outra fonte notificadora)', key:'unidadeSaude', required:true, span:'span2'})}
        ${field({num:'', label:'Data da Notificação', key:'dataNotificacao', type:'date', required:true})}
        ${field({num:'', label:'Data do Acidente', key:'dataAcidente', type:'date'})}
        ${field({num:'', label:'Município de Notificação', key:'municipioNotificacao', required:true})}
        ${field({num:'', label:'UF de Notificação', key:'ufNotificacao', type:'select', required:true, options: UFS.map(u=>[u,u])})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados Gerais do Paciente</div>
      <div class="field-grid">
        ${field({num:'', label:'Nome do Paciente', key:'patientName', required:true, span:'span2'})}
        ${field({num:'', label:'Nome da Mãe', key:'motherName', span:'span2'})}
        ${field({num:'', label:'Data de Nascimento', key:'dataNascimento', type:'date', required:true})}
        <div class="field"><label>Idade / Faixa Etária (automático)</label><div class="readonly-chip" id="idadeChip">${idadeChipText()}</div></div>
        ${field({num:'', label:'Sexo', key:'sexo', type:'select', required:true, options:[['M','Masculino'],['F','Feminino'],['I','Ignorado']]})}
        ${field({num:'', label:'Raça/Cor', key:'racaCor', type:'select', options:[['1','Branca'],['2','Preta'],['3','Amarela'],['4','Parda'],['5','Indígena'],['9','Ignorado']]})}
        ${field({num:'', label:'Escolaridade', key:'escolaridade', type:'select', options:[['0','Analfabeto'],['1','1ª a 4ª série incompleta do EF'],['2','4ª série completa do EF'],['3','5ª a 8ª série incompleta do EF'],['4','Ensino fundamental completo'],['5','Ensino médio incompleto'],['6','Ensino médio completo'],['7','Educação superior incompleta'],['8','Educação superior completa'],['9','Ignorado'],['10','Não se aplica']], span:'span2'})}
        ${field({num:'', label:'Gestante', key:'gestante', type:'select', options:[['1','1º Trimestre'],['2','2º Trimestre'],['3','3º Trimestre'],['4','Idade gestacional ignorada'],['5','Não'],['6','Não se aplica'],['9','Ignorado']]})}
        ${field({num:'', label:'Número do Cartão SUS', key:'cartaoSus'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados de Residência</div>
      <div class="field-grid">
        ${field({num:'', label:'UF', key:'resUf', type:'select', options: UFS.map(u=>[u,u])})}
        ${field({num:'', label:'Município de Residência', key:'resMunicipio'})}
        ${field({num:'', label:'Distrito', key:'resDistrito'})}
        ${field({num:'', label:'Bairro', key:'resBairro'})}
        ${field({num:'', label:'Logradouro (rua, avenida...)', key:'resLogradouro', span:'span2'})}
        ${field({num:'', label:'Número', key:'resNumero'})}
        ${field({num:'', label:'Complemento (apto., casa...)', key:'resComplemento'})}
        ${field({num:'', label:'CEP', key:'resCep'})}
        ${field({num:'', label:'Zona', key:'resZona', type:'select', options:[['1','Urbana'],['2','Rural'],['3','Periurbana'],['9','Ignorado']]})}
        ${field({num:'', label:'Ponto de Referência', key:'resPontoReferencia', span:'span2'})}
        ${field({num:'', label:'Telefone (DDD + número)', key:'resTelefone', type:'tel'})}
        ${field({num:'', label:'País (se residente fora do Brasil)', key:'resPais'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Antecedentes Epidemiológicos — Ocupação</div>
      <div class="field-grid">
        ${field({num:'', label:'Nº do SINAN', key:'numeroSinan', hint:'Número de identificação da notificação no SINAN'})}
        ${autocompleteField({num:'', label:'Ocupação (CBO)', key:'ocupacao', db:'cbo', required:true, hint:'Busca inteligente por código ou descrição'})}
        ${field({num:'', label:'Situação no Mercado de Trabalho', key:'situacaoMercado', type:'select', span:'span2', options:[
          ['01','Empregado registrado com carteira assinada'],['02','Empregado não registrado'],['03','Autônomo/conta própria'],
          ['04','Servidor público estatutário'],['05','Servidor público celetista'],['06','Aposentado'],['07','Desempregado'],
          ['08','Trabalho temporário'],['09','Cooperativado'],['10','Trabalhador avulso'],['11','Empregador'],['12','Outros'],['99','Ignorado']]})}
        ${field({num:'', label:'Tempo de Trabalho na Ocupação', key:'tempoTrabalhoOcupacao', hint:'Ex.: 2 anos, 6 meses'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados da Empresa Contratante</div>
      <div class="field-grid">
        ${field({num:'', label:'Registro / CNPJ ou CPF', key:'cnpjCpf'})}
        ${field({num:'', label:'Nome da Empresa ou Empregador', key:'nomeEmpresa', required:true, span:'span2'})}
        ${field({num:'', label:'Atividade Econômica (CNAE)', key:'cnae'})}
        ${field({num:'', label:'UF', key:'empUf', type:'select', options: UFS.map(u=>[u,u])})}
        ${field({num:'', label:'Município', key:'empMunicipio'})}
        ${field({num:'', label:'Distrito', key:'empDistrito'})}
        ${field({num:'', label:'Bairro', key:'empBairro'})}
        ${field({num:'', label:'Endereço', key:'empEndereco', span:'span2'})}
        ${field({num:'', label:'Número', key:'empNumero'})}
        ${field({num:'', label:'Ponto de Referência', key:'empPontoReferencia'})}
        ${field({num:'', label:'Telefone (DDD + número)', key:'empTelefone', type:'tel'})}
        ${field({num:'', label:'O Empregador é Empresa Terceirizada', key:'empregadorTerceirizada', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
      </div>
    </div>
  </div>`;
}
function idadeChipText(){
  const age = calcIdade(formData.dataNascimento);
  if(age==null) return 'Informe a data de nascimento';
  return `${age} anos — ${faixaEtaria(age)}`;
}
function selectAgravo(k){
  syncFormFromDOM();
  formData.agravoType = k;
  render();
}

function renderPage2(type){
  if(type === 'lerdort') return renderPage2LerDort();
  if(type === 'mental') return renderPage2Mental();
  if(type === 'biologico') return renderPage2Biologico();
  return renderPage2Grave();
}
function renderPage2Grave(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Dados do Acidente</div>
      <div class="field-grid">
        ${field({num:34, label:'Local Onde Ocorreu o Acidente', key:'localAcidente', type:'select', span:'span2', options:[['1','Instalações do contratante'],['2','Via pública'],['3','Instalações de terceiros'],['4','Domicílio próprio'],['9','Ignorado']]})}
        ${field({num:47, label:'Se Empresa Terceirizada, CNAE da Empresa Principal', key:'cnaeEmpresaPrincipal'})}
        ${field({num:48, label:'CNPJ da Empresa Principal', key:'cnpjEmpresaPrincipal'})}
        ${field({num:49, label:'Razão Social (Empresa Principal)', key:'razaoSocialEmpresaPrincipal', span:'span2'})}
        ${field({num:'', label:'Data do Acidente', key:'dataAcidente', type:'date', required:true})}
        ${field({num:50, label:'Hora do Acidente', key:'horaAcidente', type:'text', hint:'Formato HH:MM'})}
        ${field({num:51, label:'Horas Após o Início da Jornada', key:'horasAposInicioJornada', hint:'Formato HH:MM'})}
        ${field({num:52, label:'UF de Ocorrência', key:'ufOcorrencia', type:'select', required:true, options: UFS.map(u=>[u,u])})}
        ${field({num:53, label:'Município de Ocorrência do Acidente', key:'municipioOcorrencia', required:true, span:'span2'})}
        ${autocompleteField({num:54, label:'Código da Causa do Acidente (CID-10, V01 a Y98)', key:'causaCID10', db:'cid'})}
        ${field({num:55, label:'Tipo de Acidente', key:'tipoAcidente', type:'select', required:true, options:[['1','Típico'],['2','Trajeto'],['9','Ignorado']]})}
        ${field({num:56, label:'Houve Outros Trabalhadores Atingidos', key:'houveOutrosTrabalhadores', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:57, label:'Se Sim, Quantos', key:'quantosTrabalhadores', type:'number'})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Dados do Atendimento Médico</div>
      <div class="field-grid">
        ${field({num:58, label:'Ocorreu Atendimento Médico?', key:'ocorreuAtendimentoMedico', type:'select', required:true, options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:59, label:'Data do Atendimento', key:'dataAtendimento', type:'date'})}
        ${field({num:60, label:'UF do Atendimento', key:'ufAtendimento', type:'select', options: UFS.map(u=>[u,u])})}
        ${field({num:61, label:'Município do Atendimento', key:'municipioAtendimento'})}
        ${field({num:62, label:'Nome da Unidade de Saúde de Atendimento', key:'nomeUnidadeAtendimento', span:'span2'})}
        ${checkboxGroup({num:63, label:'Partes do Corpo Atingidas', key:'partesCorpo', options: PARTES_CORPO})}
        ${autocompleteField({num:64, label:'Diagnóstico da Lesão (CID-10)', key:'diagnosticoLesaoCID10', db:'cid'})}
        ${field({num:65, label:'Regime de Tratamento', key:'regimeTratamento', type:'select', options:[['1','Hospitalar'],['2','Ambulatorial'],['3','Ambos'],['9','Ignorado']]})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Conclusão</div>
      <div class="field-grid">
        ${field({num:66, label:'Evolução do Caso', key:'evolucaoCaso', type:'select', span:'span2', options:[
          ['1','Cura'],['2','Incapacidade temporária'],['3','Incapacidade parcial permanente'],['4','Incapacidade total permanente'],
          ['5','Óbito por acidente de trabalho grave'],['6','Óbito por outras causas'],['7','Outro'],['9','Ignorado']]})}
        ${field({num:67, label:'Se Óbito, Data do Óbito', key:'dataObito', type:'date'})}
        ${field({num:68, label:'Foi Emitida a Comunicação de Acidente de Trabalho (CAT)', key:'foiEmitidaCAT', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
      </div>
    </div>

    <div class="form-section">
      <div class="sec-title">Descrição e Investigação</div>
      <div class="field-grid">
        ${field({num:'', label:'Descrição sumária de como ocorreu o acidente/atividade/causas/condições/objeto/agentes que concorreram direta ou indiretamente para a ocorrência', key:'descricaoSumaria', type:'textarea', span:'full'})}
        ${field({num:'', label:'Informações complementares e observações', key:'informacoesComplementares', type:'textarea', span:'full'})}
        ${field({num:'', label:'Município/Unidade de Saúde do Investigador', key:'investigadorMunicipioUnidade', span:'span2'})}
        ${field({num:'', label:'Código da Unidade de Saúde', key:'codUnidadeSaude'})}
        ${field({num:'', label:'Nome do Investigador', key:'investigadorNome'})}
        ${field({num:'', label:'Função', key:'investigadorFuncao'})}
        ${field({num:'', label:'Assinatura', key:'investigadorAssinatura', hint:'Registro textual da assinatura'})}
      </div>
    </div>
  </div>`;
}

function renderPage2LerDort(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Doença Relacionada ao Trabalho — LER/DORT</div>
      <div class="field-grid">
        ${field({num:'', label:'Data do Diagnóstico', key:'dataDiagnosticoLD', type:'date', required:true})}
        ${field({num:46, label:'Tempo de Exposição ao Agente de Risco', key:'tempoExposicaoRiscoLD', hint:'Ex.: 3 anos'})}
        ${field({num:47, label:'Regime de Tratamento', key:'regimeTratamentoLD', type:'select', required:true, options:[['1','Hospitalar'],['2','Ambulatorial']]})}
        ${checkboxGroup({num:48, label:'Agravos Associados', key:'agravosAssociados', options:['Hipertensão Arterial','Diabetes Mellitus','Transtorno Mental','Tuberculose','Hanseníase','Asma']})}
        ${field({num:'', label:'Outros Agravos Associados', key:'agravosAssociadosOutras'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Lesões por Esforços Repetitivos / Doenças Osteomusculares Relacionadas ao Trabalho</div>
      <div class="field-grid">
        ${checkboxGroup({num:49, label:'Sinais e Sintomas', key:'sinaisSintomas', options:['Alteração de sensibilidade','Dor','Diminuição de força muscular','Limitação de movimentos','Diminuição do movimento','Sinais flogísticos']})}
        ${field({num:'', label:'Outro Sinal/Sintoma', key:'sinaisSintomasOutro'})}
        ${field({num:50, label:'Limitação e Incapacidade para o Exercício de Tarefas', key:'limitacaoIncapacidade', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${checkboxGroup({num:51, label:'O Paciente está Exposto em seu Local de Trabalho a', key:'exposicaoTrabalho', options:['Há tempo de pausas','Jornada de trabalho de mais de 6 horas','Prêmios de produção','Movimentos repetitivos','Ambiente estressante']})}
        ${autocompleteField({num:52, label:'Diagnóstico Específico (CID-10)', key:'diagnosticoCID10', db:'cid'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Afastamento e Conduta</div>
      <div class="field-grid">
        ${field({num:53, label:'Houve Afastamento do Trabalho para Tratamento?', key:'houveAfastamentoTratamento', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:54, label:'Tempo de Afastamento do Trabalho para Tratamento', key:'tempoAfastamentoTrabalho'})}
        ${field({num:55, label:'Com Afastamento do Trabalho', key:'evolucaoComAfastamento', type:'select', options:[['1','Melhora'],['2','Piora'],['9','Ignorado']]})}
        ${field({num:56, label:'Há ou Houve Outros Trabalhadores com a Mesma Doença no Local de Trabalho?', key:'outrosTrabalhadoresMesmaDoenca', type:'select', span:'span2', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${checkboxGroup({num:57, label:'Conduta Geral', key:'condutaGeral', options:['Afastamento do agente do risco com mudança de função e/ou posto de trabalho','Adoção de proteção individual','Adoção de mudança na organização do trabalho','Adoção de proteção coletiva','Nenhum']})}
        ${field({num:'', label:'Outra Conduta', key:'condutaGeralOutros'})}
      </div>
    </div>
    ${renderConclusaoBlock({evolucaoOptions:[
      ['1','Cura'],['2','Cura não confirmada'],['3','Incapacidade Temporária'],['4','Incapacidade Permanente Parcial'],['5','Incapacidade Permanente Total'],
      ['6','Óbito por doença relacionada ao trabalho'],['7','Óbito por Outra Causa'],['8','Outro'],['9','Ignorado']]})}
    ${renderInvestigadorBlock()}
  </div>`;
}

function renderPage2Mental(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Doença Relacionada ao Trabalho — Transtornos Mentais</div>
      <div class="field-grid">
        ${field({num:'', label:'Data do Diagnóstico', key:'dataDiagnosticoMental', type:'date', required:true})}
        ${field({num:46, label:'Tempo de Exposição ao Agente de Risco', key:'tempoExposicaoRiscoMental', hint:'Ex.: 8 meses'})}
        ${field({num:47, label:'Regime de Tratamento', key:'regimeTratamentoMental', type:'select', required:true, options:[['1','Hospitalar'],['2','Ambulatorial']]})}
        ${autocompleteField({num:48, label:'Diagnóstico Específico (CID-10)', key:'diagnosticoCID10', db:'cid'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Hábitos</div>
      <div class="field-grid">
        ${checkboxGroup({num:49, label:'Hábitos (aceita mais de uma opção)', key:'habitos', options:['Álcool','Psicofármacos','Drogas psicoativas']})}
        ${field({num:'', label:'Hábito de Fumar', key:'habitoFumar', type:'select', options:[['1','Sim'],['2','Não'],['3','Ex-fumante'],['9','Ignorado']]})}
        ${field({num:50, label:'Tempo de Exposição ao Tabaco', key:'tempoExposicaoTabaco'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Conduta e Encaminhamento</div>
      <div class="field-grid">
        ${checkboxGroup({num:52, label:'Conduta Geral', key:'condutaGeralMental', options:['Afastamento da situação de desgaste mental','Adoção de proteção individual','Adoção de mudança na organização do trabalho','Adoção de proteção coletiva','Nenhum']})}
        ${field({num:'', label:'Outra Conduta', key:'condutaGeralMentalOutros'})}
        ${field({num:'', label:'Afastamento do Local de Trabalho', key:'afastamentoLocalTrabalhoMental', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:53, label:'Há ou Houve Outros Trabalhadores com a Mesma Doença no Local de Trabalho?', key:'outrosTrabalhadoresMesmaDoenca', type:'select', span:'span2', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:54, label:'O Paciente foi Encaminhado a um CAPS ou Outro Serviço Especializado em Transtornos Mentais?', key:'encaminhadoCAPS', type:'select', span:'span2', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
      </div>
    </div>
    ${renderConclusaoBlock({evolucaoOptions:[
      ['1','Cura'],['2','Cura não confirmada'],['3','Incapacidade Temporária'],['4','Incapacidade Permanente Parcial'],['5','Incapacidade Permanente Total'],
      ['6','Óbito por doença relacionada ao trabalho'],['7','Óbito por Outra Causa'],['8','Outro'],['9','Ignorado']]})}
    ${renderInvestigadorBlock()}
  </div>`;
}

function renderPage2Biologico(){
  return `
  <div class="panel">
    <div class="form-section">
      <div class="sec-title">Acidente com Exposição a Material Biológico</div>
      <div class="field-grid">
        ${field({num:'', label:'Data do Acidente', key:'dataAcidenteBio', type:'date', required:true})}
        ${checkboxGroup({num:46, label:'Tipo de Exposição', key:'tipoExposicao', options:['Percutânea','Mucosa (oral/ocular)','Pele íntegra','Pele não íntegra']})}
        ${field({num:'', label:'Outro Tipo de Exposição', key:'tipoExposicaoOutro'})}
        ${field({num:47, label:'Material Orgânico', key:'materialOrganico', type:'select', required:true, options:[['1','Sangue'],['2','Líquor'],['3','Líquido pleural'],['4','Líquido ascítico'],['5','Líquido amniótico'],['6','Fluido com sangue'],['7','Soro/plasma'],['8','Outros'],['9','Ignorado']]})}
        ${field({num:'', label:'Outro Material Orgânico', key:'materialOrganicoOutro'})}
        ${field({num:48, label:'Circunstância do Acidente', key:'circunstanciaAcidente', type:'select', span:'span2', options:[
          ['01','Administração de medicação endovenosa'],['02','Administração de medicação intramuscular'],['03','Administração de medicação subcutânea'],
          ['04','Administração de medicação intradérmica'],['05','Punção venosa/arterial para coleta de sangue'],['06','Punção venosa/arterial não especificada'],
          ['07','Descarte inadequado de material perfurocortante em bancada, cama, chão etc.'],['08','Descarte inadequado de material perfurocortante em saco de lixo'],
          ['09','Lavanderia'],['10','Lavagem de material'],['11','Manipulação de caixa com material perfurocortante'],['12','Procedimento cirúrgico'],
          ['13','Procedimento odontológico'],['14','Procedimento laboratorial'],['15','Dextro'],['16','Reencape'],['98','Outros'],['99','Ignorado']]})}
        ${field({num:49, label:'Agente', key:'agenteBiologico', type:'select', options:[['1','Agulha com lúmen (luz)'],['2','Agulha sem lúmen/maciça'],['3','Intracath'],['4','Vidros'],['5','Lâmina/lanceta (qualquer tipo)'],['9','Ignorado']]})}
        ${checkboxGroup({num:50, label:'Uso de EPI (aceita mais de uma opção)', key:'usoEPI', options:['LUVA','Avental','Óculos','Máscara','Proteção facial','Bota']})}
        ${field({num:'', label:'Outro EPI', key:'usoEPIOutro'})}
        ${field({num:51, label:'Situação Vacinal do Acidentado em Relação à Hepatite B (3 doses)', key:'situacaoVacinalHepB', type:'select', span:'span2', options:[['1','Vacinado'],['2','Não vacinado'],['9','Ignorado']]})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Resultados de Exames do Acidentado (no momento do acidente — data ZERO)</div>
      <div class="field-grid">
        ${field({num:52, label:'Anti-HIV', key:'examAntiHIV', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'HbsAg', key:'examHbsAg', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Anti-HBs', key:'examAntiHBs', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Anti-HCV', key:'examAntiHCV', type:'select', options: RESULT_EXAME_OPTIONS})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Paciente Fonte</div>
      <div class="field-grid">
        ${field({num:53, label:'Paciente Fonte Conhecida?', key:'pacienteFonteConhecida', type:'select', options:[['1','Sim'],['2','Não'],['9','Ignorado']]})}
        ${field({num:54, label:'Fonte — HbsAg', key:'fonteHbsAg', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Fonte — Anti-HBc', key:'fonteAntiHBc', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Fonte — Anti-HIV', key:'fonteAntiHIV', type:'select', options: RESULT_EXAME_OPTIONS})}
        ${field({num:'', label:'Fonte — Anti-HCV', key:'fonteAntiHCV', type:'select', options: RESULT_EXAME_OPTIONS})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Conduta no Momento do Acidente</div>
      <div class="field-grid">
        ${checkboxGroup({num:55, label:'Conduta (aceita mais de uma opção)', key:'condutaMomentoAcidente', options:['Sem indicação de quimioprofilaxia','Recusou quimioprofilaxia indicada','AZT+3TC','AZT+3TC+Indinavir','AZT+3TC+Nelfinavir','Imunoglobulina humana contra hepatite B (HBIG)','Vacina contra hepatite B']})}
        ${field({num:'', label:'Outro Esquema de ARV (especifique)', key:'outroEsquemaARV', span:'span2'})}
      </div>
    </div>
    <div class="form-section">
      <div class="sec-title">Conclusão</div>
      <div class="field-grid">
        ${field({num:56, label:'Evolução do Caso', key:'evolucaoCaso', type:'select', span:'span2', options:[
          ['1','Alta com conversão sorológica'],['2','Alta sem conversão sorológica'],['3','Alta paciente fonte negativo'],
          ['4','Abandono'],['5','Óbito por acidente com exposição a material biológico'],['6','Óbito por Outra Causa'],['9','Ignorado']]})}
        ${field({num:'', label:'Se Conversão Sorológica, Especificar Vírus', key:'especificarVirus'})}
        ${field({num:57, label:'Se Óbito, Data do Óbito', key:'dataObito', type:'date'})}
        ${field({num:58, label:'Foi Emitida a Comunicação de Acidente de Trabalho (CAT)', key:'foiEmitidaCAT', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
      </div>
    </div>
    ${renderInvestigadorBlock()}
  </div>`;
}
const RESULT_EXAME_OPTIONS = [['1','Positivo'],['2','Negativo'],['3','Inconclusivo'],['4','Não realizado'],['9','Ignorado']];

function renderConclusaoBlock(opts){
  return `<div class="form-section">
    <div class="sec-title">Conclusão</div>
    <div class="field-grid">
      ${field({num:'', label:'Evolução do Caso', key:'evolucaoCaso', type:'select', span:'span2', options:opts.evolucaoOptions})}
      ${field({num:'', label:'Se Óbito, Data do Óbito', key:'dataObito', type:'date'})}
      ${field({num:'', label:'Foi Emitida a Comunicação de Acidente de Trabalho (CAT)', key:'foiEmitidaCAT', type:'select', options:[['1','Sim'],['2','Não'],['3','Não se aplica'],['9','Ignorado']]})}
    </div>
  </div>`;
}
function renderInvestigadorBlock(){
  return `<div class="form-section">
    <div class="sec-title">Investigador e Observações</div>
    <div class="field-grid">
      ${field({num:'', label:'Informações Complementares e Observações', key:'informacoesComplementares', type:'textarea', span:'full'})}
      ${field({num:'', label:'Município/Unidade de Saúde do Investigador', key:'investigadorMunicipioUnidade', span:'span2'})}
      ${field({num:'', label:'Código da Unidade de Saúde', key:'codUnidadeSaude'})}
      ${field({num:'', label:'Nome do Investigador', key:'investigadorNome'})}
      ${field({num:'', label:'Função', key:'investigadorFuncao'})}
      ${field({num:'', label:'Assinatura', key:'investigadorAssinatura', hint:'Registro textual da assinatura'})}
    </div>
  </div>`;
}

function syncFormFromDOM(){
  document.querySelectorAll('#mainForm [data-k]').forEach(el=>{
    formData[el.dataset.k] = el.value;
  });
  const groups = {};
  document.querySelectorAll('#mainForm [data-ck]').forEach(el=>{
    const k = el.dataset.ck;
    groups[k] = groups[k] || [];
    if(el.checked) groups[k].push(el.value);
  });
  Object.keys(groups).forEach(k => formData[k] = groups[k]);
}

function bindFormEvents(){
  const form = document.getElementById('mainForm');
  if(!form) return;
  form.addEventListener('input', e=>{
    if(e.target.dataset.k === 'dataNascimento'){
      formData.dataNascimento = e.target.value;
      const chip = document.getElementById('idadeChip');
      if(chip) chip.textContent = idadeChipText();
    }
    if(e.target.dataset.ac){
      handleAutocomplete(e.target);
    }
  });
  document.querySelectorAll('.ac-list').forEach(list=>{
    list.addEventListener('mousedown', e=>{
      const item = e.target.closest('.ac-item');
      if(!item) return;
      const inputKey = list.id.replace('ac-','');
      const input = document.querySelector(`[data-k="${inputKey}"]`);
      input.value = item.dataset.value;
      formData[inputKey] = item.dataset.value;
      list.classList.remove('open');
    });
  });
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.autocomplete')) document.querySelectorAll('.ac-list').forEach(l=>l.classList.remove('open'));
  });
}
function handleAutocomplete(input){
  const db = input.dataset.ac === 'cbo' ? CBO_DB : CID10_DB;
  const key = input.dataset.k;
  const q = input.value.trim().toLowerCase();
  const list = document.getElementById('ac-'+key);
  if(!q){ list.classList.remove('open'); return; }
  const matches = db.filter(d => d.code.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)).slice(0,8);
  if(!matches.length){ list.innerHTML = `<div class="ac-item" style="color:var(--text-muted)">Nenhum resultado na base local</div>`; list.classList.add('open'); return; }
  list.innerHTML = matches.map(m => `<div class="ac-item" data-value="${esc(m.code+' - '+m.desc)}"><b>${esc(m.code)}</b> — ${esc(m.desc)}</div>`).join('');
  list.classList.add('open');
}

async function saveRecord(){
  syncFormFromDOM();
  const idx = records.findIndex(r=>r.id===formData.id);
  if(idx>=0){
    records[idx] = formData;
  } else {
    records.push(formData);
  }
  const btn = document.getElementById('saveRecordBtn');
  if(btn){ btn.disabled = true; btn.textContent = 'Salvando...'; }
  const ok = await upsertRecordRemote(formData);
  if(ok){
    showToast('Registro salvo com sucesso.');
    goTo('consulta');
  } else {
    if(idx>=0){
      // idx era o registro original antes da edição local; não temos como restaurar
      // o valor anterior aqui, então apenas avisamos e deixamos os dados no formulário
      // para o usuário tentar salvar de novo.
    } else {
      records = records.filter(r=>r.id!==formData.id);
    }
    if(btn){ btn.disabled = false; btn.textContent = 'Salvar Registro'; }
    showToast('Erro: o registro NÃO foi salvo no banco de dados. Verifique sua conexão e tente novamente.');
  }
}
function fichaLabel(r){
  return r.fichaNumero ? '#' + String(r.fichaNumero) : '—';
}

/* ============================= IMPRESSÃO ============================= */
function renderPrint(id){
  const r = records.find(x=>x.id===id);
  if(!r) return `<div class="panel">Registro não encontrado.</div>`;
  const age = calcIdade(r.dataNascimento);
  const rows = (pairs) => pairs.map(([l,v])=>`<tr><td style="width:45%;color:var(--text-muted)">${esc(l)}</td><td><b>${esc(v||'—')}</b></td></tr>`).join('');
  return `
  <div class="panel no-print" style="display:flex;justify-content:space-between;align-items:center">
    <div>Visualização para impressão</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm" onclick="goTo('consulta')">Voltar</button>
      <button class="btn btn-primary btn-sm" onclick="window.print()">Imprimir</button>
    </div>
  </div>
  <div class="panel">
    <h2 style="font-size:16px">Ficha de Investigação — ${esc(AGRAVOS[r.agravoType]?.label||'')} <span style="font-family:var(--font-mono);color:var(--text-muted);font-size:13px">(${esc(fichaLabel(r))})</span></h2>
    <table>${rows([
      ['Unidade de Saúde', r.unidadeSaude],['Data da Notificação', fmtDate(r.dataNotificacao)],
      ['Data do Acidente', fmtDate(r.dataAcidente)],
      ['Nome do Paciente', r.patientName],['Data de Nascimento', fmtDate(r.dataNascimento)+ (age!=null?` (${age} anos — ${faixaEtaria(age)})`:'')],
      ['Sexo', r.sexo],['Município/UF de Notificação', (r.municipioNotificacao||'')+' / '+(r.ufNotificacao||'')],
      ['Ocupação', r.ocupacao],['Empresa', r.nomeEmpresa],['CNPJ/CPF', r.cnpjCpf],
    ])}</table>
    ${r.agravoType==='grave' ? `<h2 style="font-size:14px;margin-top:16px">Acidente de Trabalho Grave</h2><table>${rows([
      ['Tipo de Acidente', r.tipoAcidente==='1'?'Típico':r.tipoAcidente==='2'?'Trajeto':r.tipoAcidente],
      ['Município/UF de Ocorrência', (r.municipioOcorrencia||'')+' / '+(r.ufOcorrencia||'')],
      ['Causa (CID-10)', r.causaCID10],['Diagnóstico da Lesão (CID-10)', r.diagnosticoLesaoCID10],
      ['Partes do Corpo Atingidas', (r.partesCorpo||[]).join(', ')],
      ['Evolução do Caso', r.evolucaoCaso],['CAT Emitida', r.foiEmitidaCAT==='1'?'Sim':r.foiEmitidaCAT==='2'?'Não':r.foiEmitidaCAT],
      ['Investigador', r.investigadorNome],
    ])}</table>
    <div style="margin-top:12px"><b>Descrição sumária:</b><br>${esc(r.descricaoSumaria||'—')}</div>` : ''}
  </div>`;
}

/* ============================= INIT ============================= */
(async function init(){
  try{
    if(!supabaseClient){
      throw new Error('Não foi possível conectar ao banco de dados (biblioteca do Supabase não carregou). Verifique sua conexão ou bloqueadores de script e recarregue a página.');
    }
    const { data: { session } } = await supabaseClient.auth.getSession();
    if(session && session.user){
      currentUser = session.user;
      await startApp();
    } else {
      document.getElementById('appRoot').innerHTML = renderLogin();
      bindLoginEvents();
    }

    supabaseClient.auth.onAuthStateChange((event, session)=>{
      if(event === 'SIGNED_OUT'){
        currentUser = null;
      } else if(session && session.user && !currentUser){
        // Sessão restaurada em outra aba/token renovado antes de startApp já ter rodado
        currentUser = session.user;
      }
    });
  }catch(e){
    console.error('Erro ao iniciar o SNAT', e);
    document.getElementById('appRoot').innerHTML = `
      <div class="login-wrap">
        <div class="login-card">
          <div class="login-brand">
            <div class="tag">Erro ao iniciar</div>
            <div class="title" style="color:var(--red);font-size:20px;">Algo deu errado</div>
          </div>
          <div class="login-error">${esc(e.message || 'Erro desconhecido ao carregar a aplicação.')}</div>
          <div class="login-hint">Recarregue a página. Se o problema continuar, verifique o console do navegador (F12) para mais detalhes.</div>
        </div>
      </div>`;
  }
})();
