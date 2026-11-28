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
    const cnt = [0, 0, 0, 0];
    for (let i = 0; i < n; i += 2) cnt[(s.charCodeAt(i) - 48) * 2 + (s.charCodeAt(i + 1) - 48)]++;
    let ans = 0;
    for (let l = -1; l < 4; l++) {
      for (let r = -1; r < 4; r++) {
        const c = cnt.slice();
        if (l >= 0) { if (c[l] === 0) continue; c[l]--; }
        if (r >= 0) { if (c[r] === 0) continue; c[r]--; }
        for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let m = 0; m < 2; m++) {
          if (b && c[1] === 0) continue;
          const seq = [];
          let len = 0;
          if (l >= 0) { seq.push(l & 1); len++; }
          if (a && c[0]) { seq.push(0); len += 2 * c[0]; }
          if (b) { seq.push(0, 1); len += 2; }
          if (m && c[3]) { seq.push(1); len += 2 * c[3]; }
          if (r >= 0) { seq.push(r >> 1); len++; }
          let ok = true;
          for (let i = 1; i < seq.length; i++) if (seq[i] < seq[i - 1]) ok = false;
          if (ok && len > ans) ans = len;
        }
      }
    }
    print(ans);
  }
}

solve();
printAll();
