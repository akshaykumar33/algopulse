const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const s = tokens[0];
  const t = tokens[1];
  let c0 = 0;
  let c1 = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') c0++;
    else c1++;
  }
  const m = t.length;
  const pi = new Int32Array(m);
  for (let i = 1; i < m; i++) {
    let j = pi[i - 1];
    while (j > 0 && t[i] !== t[j]) j = pi[j - 1];
    if (t[i] === t[j]) j++;
    pi[i] = j;
  }
  const res = [];
  let cur = 0;
  for (let i = 0; i < s.length; i++) {
    const need = t[cur];
    if (need === '0' && c0 > 0) {
      res.push('0');
      c0--;
      cur++;
    } else if (need === '1' && c1 > 0) {
      res.push('1');
      c1--;
      cur++;
    } else {
      while (c0 > 0) {
        res.push('0');
        c0--;
      }
      while (c1 > 0) {
        res.push('1');
        c1--;
      }
      break;
    }
    if (cur === m) cur = pi[m - 1];
  }
  console.log(res.join(''));
}

solve();
