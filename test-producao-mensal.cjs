const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('./app.js', 'utf8');
const start = source.indexOf('const PRODUCAO_SIA_SUS_CODES = [');
const end = source.indexOf('/* ============================= CONTROLE DE FICHAS ============================= */', start);
assert.ok(start >= 0 && end > start, 'bloco de Produção Mensal não encontrado');

const sandbox = {
  console,
  Date,
  Math,
  String,
  Number,
  Array,
  Object,
  Boolean,
  PRODUCAO_RESPONSAVEIS: ['Julio Cesar', 'Luciane Manhães'],
  producaoMensal: [],
  producaoView: 'departamento',
  producaoMesFiltro: '2026-09',
  producaoFormOwner: '',
  uid: () => 'test-id',
  todayISO: () => '2026-09-01',
  fmtDate: value => value || '—',
  esc: value => String(value ?? ''),
  goTo: () => {},
  render: () => {},
  showToast: () => {},
  upsertProducaoRemote: async () => true,
  deleteProducaoRemote: async () => true,
  window: {confirm: () => true, supabase: {createClient: () => ({})}},
};
vm.runInNewContext(`${source.slice(start, end)}; globalThis.result = { codes: PRODUCAO_SIA_SUS_CODES, total: producaoTotal, codesFrom: producaoCodes, summary: producaoSummaryByCode, filtered: producaoFilteredItems };`, sandbox);
const result = sandbox.result;

assert.equal(result.codes.length, 22, 'o mapa deve conter 22 códigos SIA/SUS');
assert.equal(result.codes[0][0], '03.01.02.004-3');
assert.match(result.codes[0][1], /Investigação epidemiológica/i);
assert.deepEqual(Array.from(result.codesFrom({codigoSiaSus: '01.02.02.001-9, 01.02.02.002-7'})), ['01.02.02.001-9', '01.02.02.002-7']);
assert.equal(result.total([{quantidade: 2}, {quantidade: 3}]), 5);

sandbox.producaoMensal = [
  {data: '2026-09-01', responsavel: 'Julio Cesar', quantidade: 2, codigoSiaSus: ['01.02.02.001-9']},
  {data: '2026-09-02', responsavel: 'Luciane Manhães', quantidade: 3, codigoSiaSus: ['01.02.02.001-9', '01.02.02.002-7']},
  {data: '2026-08-31', responsavel: 'Julio Cesar', quantidade: 8, codigoSiaSus: ['01.02.02.003-5']},
];
assert.equal(result.filtered('Julio Cesar').length, 1, 'a visão de Julio deve filtrar mês e responsável');
assert.equal(result.total(result.filtered()), 5, 'o total mensal deve somar Julio e Luciane');
assert.deepEqual(Array.from(result.summary(result.filtered()), row => Array.from(row)), [['01.02.02.001-9', 5], ['01.02.02.002-7', 3]]);

console.log('Produção Mensal: todos os testes passaram.');
