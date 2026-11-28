const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readStringArray = () => readLine().trim().split(/\s+/);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 1000000007n;

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [ns, ks] = readStringArray();
    const a = BigInt(ks) - 1n;
    const d = BigInt(ns) - 1n;
    if (a === 0n) {
      print(0);
      continue;
    }
    const m = (a - 1n) / d;
    const ans = (m + 1n) * a - d * m * (m + 1n) / 2n;
    print((ans % MOD).toString());
  }
}

solve();
printAll();
