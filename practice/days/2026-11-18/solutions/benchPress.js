const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readBigIntArray = () => readLine().trim().split(/\s+/).map(BigInt);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solveCase(n, w, wr, weights) {
  if (wr >= w) return 'YES';
  let counts = new Map();
  for (let i = 0; i < n; i++) {
    counts.set(weights[i], (counts.get(weights[i]) || 0n) + 1n);
  }

  let total = wr;
  for (let [weight, count] of counts.entries()) {
    let pairs = count / 2n;
    total += pairs * 2n * weight;
    if (total >= w) return 'YES';
  }

  return 'NO';
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [n, w, wr] = readBigIntArray();
    const weights = readBigIntArray();
    print(solveCase(Number(n), w, wr, weights));
  }
}

solve();
printAll();
