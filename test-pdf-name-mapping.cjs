const fichaNumberFromPdfName = (name) => {
  const base = String(name || '').replace(/\.pdf$/i, '');
  const firstToken = base.match(/(?:^|[^0-9])([0-9]{3})(?![0-9])/);
  return firstToken ? firstToken[1] : '';
};
const cases = new Map([
  ['434_007703.pdf', '434'],
  ['435_007697.pdf', '435'],
  ['456 - AT - MARCIO AVELAR PEREIRA DO ...pdf', '456'],
  ['459 - AT - LUCAS CONCEIÇÃO MACHADO.pdf', '459'],
  ['425.pdf', '425'],
  ['sem-numero.pdf', ''],
]);
for (const [name, expected] of cases) {
  const actual = fichaNumberFromPdfName(name);
  if (actual !== expected) throw new Error(`${name}: esperado ${expected}, obtido ${actual}`);
}
console.log('Mapeamento de nomes de PDF: todos os cenários passaram.');
