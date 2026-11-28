const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const s = readLine().trim();
    let ones = 0;
    for (let i = 0; i < n; i++) if (s[i] === '1') ones++;
    const best = Math.min(n, 2 * ones);
    let k = 0, prev = 0, cost = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] !== '0') continue;
      k++;
      let q = Math.max(i + 1, prev + 1);
      if (k <= ones) q = Math.max(q, 2 * k);
      cost += q - (i + 1);
      prev = q;
    }
    print(best + ' ' + cost);
  }
}

solve();
printAll();
