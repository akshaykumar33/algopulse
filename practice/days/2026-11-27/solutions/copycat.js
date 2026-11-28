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
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const s = next();
    let ans = Infinity;
    for (let k = 0; k <= n; k++) {
      if (k < n && s[n - 1] === '0') continue;
      let c = 0;
      for (let i = 0; i < k; i++) if (s[i] === '1') c++;
      for (let i = k; i < n; i++) if (s[i] === '0') c++;
      ans = Math.min(ans, c);
    }
    print(ans);
  }
}

solve();
printAll();
