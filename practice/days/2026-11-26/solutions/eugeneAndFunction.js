const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function dr(x) {
  if (x === 0) return 0;
  const r = x % 9;
  return r === 0 ? 9 : r;
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const [a1, d, l, r] = readIntArray();
    const period = 9;
    const baseVals = [];
    for (let i = 0; i < period; i++) {
      baseVals.push(dr((a1 + i * d) % 9 === 0 && (a1 + i * d) > 0 ? 9 : ((a1 + i * d) % 9)));
    }
    const cycleVals = [];
    for (let i = 0; i < period; i++) {
      const term = a1 + i * d;
      const mod9 = ((term % 9) + 9) % 9;
      cycleVals.push(mod9 === 0 ? 9 : mod9);
    }
    const cycleSum = cycleVals.reduce((s, v) => s + v, 0);
    const len = r - l + 1;
    const startOff = (l - 1) % period;
    const full = Math.floor(len / period);
    const rem = len % period;
    let ans = full * cycleSum;
    for (let i = 0; i < rem; i++) {
      ans += cycleVals[(startOff + i) % period];
    }
    print(ans);
  }
}

solve();
printAll();
