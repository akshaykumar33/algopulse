const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length === 0 || lines[0] === '') return;
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= lines.length) break;
    const n = parseInt(lines[ptr++], 10);
    const s = lines[ptr++].trim();

    let ans = 0;
    let i = 0;
    while (i < n) {
      if (i + 1 < n && s[i] === s[i + 1]) {
        ans++;
        i += 2;
      } else {
        ans++;
        i++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
