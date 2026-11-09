const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const h = Number(tokens[pos++]);
    const s = Number(tokens[pos++]);

    const h2 = h * h;
    const s4 = 4 * s;

    if (h2 < s4) {
      out.push('-1');
    } else {
      const p = Math.sqrt(h2 + s4);
      const m = Math.sqrt(h2 - s4);
      const a = (p - m) / 2;
      const b = (p + m) / 2;
      out.push(a.toFixed(6) + ' ' + b.toFixed(6) + ' ' + h.toFixed(6));
    }
  }

  console.log(out.join('\n'));
}

solve();
