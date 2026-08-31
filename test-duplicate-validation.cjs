const fs = require('node:fs');
const assert = require('node:assert/strict');

const source = fs.readFileSync('./app.js', 'utf8');
const start = source.indexOf('function normalizeDuplicateText');
const end = source.indexOf('function distinctValues', start);
assert.notEqual(start, -1, 'Funções de duplicidade não encontradas');
assert.notEqual(end, -1, 'Fim das funções de duplicidade não encontrado');

const isolated = `
  function normalizeSearchText(value){
    return String(value || '').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();
  }
  function isoDateFromValue(value){
    const raw = String(value || '').trim();
    let match = raw.match(/\\b(\\d{1,2})[\\/.-](\\d{1,2})[\\/.-](\\d{4})\\b/);
    if(match) return match[3] + '-' + String(match[2]).padStart(2,'0') + '-' + String(match[1]).padStart(2,'0');
    match = raw.match(/\\b(\\d{4})[\\/.-](\\d{1,2})[\\/.-](\\d{1,2})\\b/);
    return match ? match[1] + '-' + String(match[2]).padStart(2,'0') + '-' + String(match[3]).padStart(2,'0') : '';
  }
  function fichaLabel(record){ return record.fichaNumero ? '#' + String(record.fichaNumero) : '—'; }
  let records = [];
  let editingId = null;
  let formData = {};
  ${source.slice(start, end)}
  module.exports = {
    duplicateComparisonFor,
    findDuplicateRecords,
    normalizeDuplicateDate,
    setRecords(value){ records = value; },
    setEditingId(value){ editingId = value; },
    setFormData(value){ formData = value; },
  };
`;

const moduleObject = { exports: {} };
new Function('module', 'exports', isolated)(moduleObject, moduleObject.exports);
const { duplicateComparisonFor, findDuplicateRecords, setRecords, setEditingId, setFormData } = moduleObject.exports;

const testRecords = [
  { id: 'r1', fichaNumero: '123', patientName: 'João da Silva', dataNotificacao: '2026-08-31' },
  { id: 'r2', fichaNumero: '456', patientName: 'Maria Souza', dataNotificacao: '2026-08-30' },
];
setRecords(testRecords);

assert.equal(duplicateComparisonFor({ fichaNumero: '123' }, testRecords[0]).byNumber, true);
assert.equal(duplicateComparisonFor({ patientName: 'JOAO DA SILVA', dataNotificacao: '31/08/2026' }, testRecords[0]).byNameDate, true);

setFormData({ id: 'new', fichaNumero: '123', patientName: '', dataNotificacao: '' });
setEditingId(null);
assert.equal(findDuplicateRecords({ id: 'new', fichaNumero: '123', patientName: '', dataNotificacao: '' }, 'new').length, 1, 'Número já existente deveria ser detectado');

setFormData({ id: 'new', fichaNumero: '', patientName: 'JOAO DA SILVA', dataNotificacao: '31/08/2026' });
const sameNameAndDate = findDuplicateRecords({ id: 'new', fichaNumero: '', patientName: 'JOAO DA SILVA', dataNotificacao: '31/08/2026' }, 'new');
assert.equal(sameNameAndDate.length, 1, 'Nome + data já existentes deveriam ser detectados');
assert.equal(sameNameAndDate[0].byNameDate, true, 'A mesma data deveria caracterizar duplicidade real');

const sameNameDifferentDate = findDuplicateRecords({ id: 'new', fichaNumero: '', patientName: 'JOAO DA SILVA', dataNotificacao: '2026-09-01' }, 'new');
assert.equal(sameNameDifferentDate.length, 1, 'Nome repetido com outra data deveria gerar aviso informativo');
assert.equal(sameNameDifferentDate[0].byPatientName, true, 'O nome repetido deveria ser informado');
assert.equal(sameNameDifferentDate[0].byNameDate, false, 'Data diferente não deveria bloquear o novo registro');

setFormData({ id: 'r1', fichaNumero: '123', patientName: 'João da Silva', dataNotificacao: '2026-08-31' });
setEditingId('r1');
assert.equal(findDuplicateRecords({ id: 'r1', fichaNumero: '123', patientName: 'João da Silva', dataNotificacao: '2026-08-31' }, 'r1').length, 0, 'O próprio registro em edição não pode ser considerado duplicado');
assert.equal(findDuplicateRecords({ id: 'r1', fichaNumero: '456', patientName: 'Maria Souza', dataNotificacao: '2026-08-30' }, 'r1').length, 0, 'A edição de uma ficha existente não deve validar duplicidade');

console.log('Validação de duplicidade: todos os cenários passaram.');
