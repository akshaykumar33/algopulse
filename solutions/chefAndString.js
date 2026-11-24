const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;
  const lines = input.split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    const s = line.trim();
    if (!s) continue;
    let c = 0;
    let h = 0;
    let e = 0;
    let f = 0;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === 'C') {
        c++;
      } else if (ch === 'H') {
        if (c > 0) {
          c--;
          h++;
        }
      } else if (ch === 'E') {
        if (h > 0) {
          h--;
          e++;
        }
      } else if (ch === 'F') {
        if (e > 0) {
          e--;
          f++;
        }
      }
    }
    out.push(f);
  }
  console.log(out.join('\n'));
}

solve();
