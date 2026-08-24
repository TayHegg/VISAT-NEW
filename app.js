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
// Base completa de CID-10 derivada dos arquivos oficiais do DATASUS (versão 2008).
const CID10_DB = [{"code":"A00","desc":"Cólera"},{"code":"A000","desc":"Cólera devida a Vibrio cholerae 01, biótipo cholerae"},{"code":"A001","desc":"Cólera devida a Vibrio cholerae 01, bióti[...]

/* ============================= PROCESSAMENTO EM LOTE DE FICHAS ============================= */
/**
 * Processa distribuição em lote de fichas separadas por vírgula
 * @param {string} numerosInput - Números das fichas separados por vírgula (ex: "001, 002, 003")
 * @param {string} departamento - Departamento destino
 * @returns {object} Objeto com array de fichas processadas e quantidade
 */
function processarDistribuicaoLote(numerosInput, departamento) {
  if (!numerosInput || !numerosInput.trim()) {
    return { sucesso: false, mensagem: 'Campo de números não pode estar vazio', fichas: [] };
  }

  // Separar os números por vírgula e limpar espaços em branco
  const numerosArray = numerosInput
    .split(',')
    .map(n => n.trim())
    .filter(n => n.length > 0);

  if (numerosArray.length === 0) {
    return { sucesso: false, mensagem: 'Nenhum número de ficha válido encontrado', fichas: [] };
  }

  // Validar e processar cada número
  const fichasProcessadas = [];
  const fichasInvalidas = [];

  numerosArray.forEach(numero => {
    // Remover caracteres especiais e validar
    const numeroLimpo = numero.replace(/[^\d]/g, '');
    
    if (numeroLimpo.length === 0) {
      fichasInvalidas.push(numero);
      return;
    }

    fichasProcessadas.push({
      numero: numeroLimpo,
      numeroOriginal: numero,
      departamento: departamento,
      dataDistribuicao: new Date().toISOString(),
      status: 'distribuido'
    });
  });

  return {
    sucesso: fichasProcessadas.length > 0,
    fichasProcessadas: fichasProcessadas,
    fichasInvalidas: fichasInvalidas,
    quantidade: fichasProcessadas.length,
    mensagem: fichasInvalidas.length > 0 
      ? `${fichasProcessadas.length} ficha(s) processada(s). ${fichasInvalidas.length} inválida(s): ${fichasInvalidas.join(', ')}`
      : `${fichasProcessadas.length} ficha(s) processada(s) com sucesso`
  };
}

/**
 * Valida se um número de ficha é válido
 * @param {string} numero - Número a validar
 * @returns {boolean}
 */
function validarNumeroFicha(numero) {
  const numeroLimpo = numero.replace(/[^\d]/g, '');
  return numeroLimpo.length > 0;
}

/**
 * Formata números de fichas para exibição
 * @param {array} fichas - Array de fichas processadas
 * @returns {array} Array formatado para exibição
 */
function formatarFichasParaExibicao(fichas) {
  return fichas.map((ficha, index) => ({
    id: `ficha-lote-${Date.now()}-${index}`,
    numero: ficha.numero.toString().padStart(3, '0'),
    departamento: ficha.departamento,
    dataDistribuicao: ficha.dataDistribuicao,
    status: ficha.status,
    tipoDistribuicao: 'lote'
  }));
}

/**
 * Gera resumo da distribuição em lote
 * @param {object} resultado - Resultado do processamento
 * @returns {string} HTML do resumo
 */
function gerarResumoDistribuicao(resultado) {
  if (!resultado.sucesso) {
    return `
      <div style="background: #FBE9E7; color: #8A2E29; padding: 12px; border-radius: 8px; border-left: 4px solid #C6423B; margin-bottom: 12px;">
        <strong>❌ Erro na distribuição:</strong> ${resultado.mensagem}
      </div>
    `;
  }

  const resumoFichas = resultado.fichasProcessadas
    .map(f => `<span style="display: inline-block; background: #E6F4EF; color: #14634F; padding: 4px 8px; border-radius: 4px; margin: 2px; font-family: monospace; font-weight: 600;">${f.numero.toString().padStart(3, '0')}</span>`)
    .join('');

  return `
    <div style="background: #E6F4EF; color: #14634F; padding: 12px; border-radius: 8px; border-left: 4px solid #1B8A72; margin-bottom: 12px;">
      <strong>✓ Distribuição em lote realizada:</strong> <br/>
      <div style="margin-top: 8px;">
        <span style="font-weight: 600; font-size: 18px; font-family: monospace;">
          ${resultado.quantidade} ficha(s)
        </span>
        <div style="margin-top: 8px; font-size: 12px;">
          Departamento: <strong>${resultado.fichasProcessadas[0]?.departamento || 'N/A'}</strong>
        </div>
      </div>
      <div style="margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.5); border-radius: 4px;">
        ${resumoFichas}
      </div>
    </div>
  `;
}
