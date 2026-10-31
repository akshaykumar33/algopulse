const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const lastParity = (s.charCodeAt(s.length - 1) - 48) % 2;
    let ok = false;
    for (let i = 0; i < s.length - 1; i++) {
      if ((s.charCodeAt(i) - 48) % 2 === lastParity) {
        ok = true;
        break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

