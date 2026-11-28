const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split(/\s+/).filter(Boolean);
let idx = 0;
const next = () => input[idx++];
const readInt = () => parseInt(next(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  const LIM = 1100000;
  const mark = new Int32Array(LIM);
  for (let t = 1; t <= T; t++) {
    const a = readInt(), b = readInt(), n = readInt();
    const x = [];
    let cur = 0;
    for (let k = 0; k < n; k++) {
      cur++;
      while (mark[cur] === t) cur++;
      x.push(cur);
      for (let j = 0; j <= k; j++) {
        const v1 = a * cur - b * x[j];
        if (v1 > cur && v1 < LIM) mark[v1] = t;
        const v2 = a * x[j] - b * cur;
        if (v2 > cur && v2 < LIM) mark[v2] = t;
      }
    }
    print(x.join(' '));
  }
}

solve();
printAll();
