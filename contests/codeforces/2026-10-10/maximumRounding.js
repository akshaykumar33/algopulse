const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let tc = 1; tc <= t; tc++) {
    const s = input[tc].trim();
    const d = new Int32Array(s.length + 1);
    for (let i = 0; i < s.length; i++) {
      d[i + 1] = s.charCodeAt(i) - 48;
    }
    let k = d.length;
    for (let i = d.length - 1; i >= 1; i--) {
      if (d[i] >= 5) {
        d[i - 1]++;
        k = i;
      }
    }
    for (let i = k; i < d.length; i++) {
      d[i] = 0;
    }
    let start = 0;
    if (d[0] === 0) {
      start = 1;
    }
    let res = '';
    for (let i = start; i < d.length; i++) {
      res += d[i];
    }
    out.push(res);
  }
  console.log(out.join('\n'));
}

solve();
