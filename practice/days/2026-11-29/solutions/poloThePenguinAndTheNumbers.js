const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

const MOD = 1000000007n;

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [l, r] = readIntArray().map(BigInt);
    let ans = 0n;
    let lo = 1n;
    for (let d = 1n; d <= 10n; d++) {
      const hi = lo * 10n - 1n;
      const a = l > lo ? l : lo;
      const b = r < hi ? r : hi;
      if (a <= b) ans += (a + b) * (b - a + 1n) / 2n * d;
      lo *= 10n;
    }
    print((ans % MOD).toString());
  }
}

solve();
printAll();
