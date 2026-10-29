const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines || lines.length === 0 || lines[0].trim() === '') return;
  let ptr = 0;
  const t = parseInt(lines[ptr++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= lines.length) break;
    const s = lines[ptr++].trim();
    const words = s.split(/\s+/);
    let fancy = false;
    for (const w of words) {
      if (w === 'not') {
        fancy = true;
        break;
      }
    }
    out.push(fancy ? 'Real Fancy' : 'regularly fancy');
  }
  console.log(out.join('\n'));
}

solve();
