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
  const INF = 1e9;
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = readInt();
    const sv = [a[0]], smin = [0], slast = [0];
    let dp = 0;
    for (let j = 1; j < n; j++) {
      while (sv.length && sv[sv.length - 1] < a[j]) { sv.pop(); smin.pop(); slast.pop(); }
      let best = INF;
      const top = sv.length - 1;
      if (top >= 0 && sv[top] === a[j]) {
        best = smin[top];
        if (top >= 1) best = Math.min(best, slast[top - 1]);
        dp = best + 1;
        smin[top] = Math.min(smin[top], dp);
        slast[top] = dp;
      } else {
        if (top >= 0) best = slast[top];
        dp = best + 1;
        sv.push(a[j]); smin.push(dp); slast.push(dp);
      }
    }
    print(dp >= INF ? -1 : dp);
  }
}

solve();
printAll();
