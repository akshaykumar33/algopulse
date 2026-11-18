const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function nCr(n, r) {
  if (r < 0 || r > n) return 0n;
  if (r === 0 || r === n) return 1n;
  if (r > n / 2) r = n - r;
  let num = 1n, den = 1n;
  for (let i = 1; i <= r; i++) {
    num *= BigInt(n - i + 1);
    den *= BigInt(i);
  }
  return num / den;
}

function solveCase(n, k, a) {
  a.sort((x, y) => x - y);
  let v = a[k - 1];
  let total = 0, need = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] === v) {
      total++;
      if (i < k) need++;
    }
  }
  return nCr(total, need).toString();
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, k] = readIntArray();
    const a = readIntArray();
    print(solveCase(n, k, a));
  }
}

solve();
printAll();
