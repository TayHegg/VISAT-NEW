const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('./app.js', 'utf8');
const start = source.indexOf('function normalizeControleFicha');
const end = source.indexOf('function findLinkedRecord');
assert(start >= 0 && end > start, 'bloco de controle não encontrado');
const sandbox = {};
vm.runInNewContext(`${source.slice(start, end)}\nthis.api={normalizeControleFicha,controleFichaStorageId,dedupeControleFichas};`, sandbox);
const {normalizeControleFicha, controleFichaStorageId, dedupeControleFichas} = sandbox.api;

assert.equal(normalizeControleFicha(' 560 '), '560');
assert.equal(controleFichaStorageId({numeroFicha:'560'}), 'cf-2026-560');

const deduped = dedupeControleFichas([
  {id:'cf-old-a', numeroFicha:'560', status:'departamento_visat', updatedAt:'2026-09-03T10:00:00.000Z'},
  {id:'cf-old-b', numeroFicha:'560', status:'departamento_visat', updatedAt:'2026-09-03T11:00:00.000Z'},
  {id:'cf-old-c', numeroFicha:'596', status:'departamento_visat', updatedAt:'2026-09-03T11:00:00.000Z'},
]);
assert.equal(deduped.length, 2, 'o mesmo número deve aparecer uma única vez');
assert.equal(JSON.stringify(deduped.map(item=>item.id).sort()), JSON.stringify(['cf-2026-560','cf-2026-596']));
assert.equal(deduped.find(item=>item.numeroFicha==='560').updatedAt, '2026-09-03T11:00:00.000Z');

assert(source.includes('onclick="confirmarControleBusca(\'numero\')"'), 'botão de pesquisa por número ausente');
assert(source.includes('onclick="confirmarControleBusca(\'nome\')"'), 'botão de pesquisa por nome ausente');
assert(source.includes('controleBuscaNumeroConfirmada'), 'estado da consulta confirmada ausente');
assert(source.includes("anoReferencia:'2026'"), 'ano de referência da distribuição ausente');

console.log('Controle de Fichas: todos os testes passaram.');
