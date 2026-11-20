const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let fav = 0, other = 0;
    let known = true;

    for (let i = 0; i < n; i++) {
      const type = parseInt(input[ptr++], 10);
      const a = parseInt(input[ptr++], 10);
      const b = parseInt(input[ptr++], 10);

      if (type === 1) {
        out.push('YES');
        fav = a;
        other = b;
        known = true;
      } else {
        if (a === b) {
          out.push('YES');
          fav = a;
          other = b;
          known = true;
        } else if (known && (Math.min(a, b) < Math.max(fav, other))) {
          out.push('YES');
          if (Math.min(a, b) < fav) {
            fav = Math.max(a, b);
            other = Math.min(a, b);
          } else {
            fav = Math.min(a, b);
            other = Math.max(a, b);
          }
        } else {
          out.push('NO');
          fav = Math.max(fav, Math.min(a, b));
          other = Math.max(other, Math.min(a, b));
          known = false;
        }
      }
    }
  }
  console.log(out.join('\n'));
}

solve();