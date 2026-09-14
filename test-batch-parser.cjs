const fs = require('fs');
const source = fs.readFileSync('app.js', 'utf8');
const start = source.indexOf('function batchNormalize');
const end = source.indexOf('function renderBatchImportModal');
if (start < 0 || end < 0) throw new Error('Funções do parser não encontradas');
function normalizeSearchText(value) {
  return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
eval(source.slice(start, end));
const numbered = parseBatchPdfName('20 - AT - GENIALDO DO ESPIRITO SANTO SOUSA FILHO.pdf');
const unnumbered = parseBatchPdfName('AT - ARTHUR COIMBRA DA SILVA.pdf');
const invalid = parseBatchPdfName('ARTHUR COIMBRA DA SILVA.pdf');
if (numbered.number !== '20' || numbered.patientName !== 'GENIALDO DO ESPIRITO SANTO SOUSA FILHO' || numbered.agravoType !== 'grave') throw new Error(`Formato numerado inválido: ${JSON.stringify(numbered)}`);
if (unnumbered.number !== '' || unnumbered.patientName !== 'ARTHUR COIMBRA DA SILVA' || unnumbered.agravoType !== 'grave') throw new Error(`Formato sem número inválido: ${JSON.stringify(unnumbered)}`);
if (invalid.number !== '' || invalid.patientName !== '') throw new Error(`Formato inválido aceito: ${JSON.stringify(invalid)}`);
if (batchItemStatus({ number: '', patientName: 'ARTHUR COIMBRA DA SILVA', record: null }) !== 'new') throw new Error('Registro sem número não foi classificado como novo');
console.log('OK', { numbered, unnumbered, invalid });
