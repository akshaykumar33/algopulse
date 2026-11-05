const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const m = parseInt(input[ptr++], 10);
    const s1 = input[ptr++];
    const s2 = input[ptr++];

    function can(startR) {
      let r = startR;
      if (r === 0 && s1[0] !== 'B') return false;
      if (r === 1 && s2[0] !== 'B') return false;
      for (let c = 0; c < m; c++) {
        const other = r === 0 ? s2[c] : s1[c];
        if (other === 'B') r = 1 - r;
        if (c + 1 < m) {
          const next = r === 0 ? s1[c + 1] : s2[c + 1];
          if (next !== 'B') return false;
        }
      }
      return true;
    }

    if (can(0) || can(1)) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
