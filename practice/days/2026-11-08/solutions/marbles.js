const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const s = a + b;

    let ans = Math.abs(1 - b);
    for (let d = 1; d * d <= s; d++) {
      if (s % d === 0) {
        if (d < s) {
          const diff1 = Math.abs(d - b);
          if (diff1 < ans) ans = diff1;
        }
        const d2 = s / d;
        if (d2 < s) {
          const diff2 = Math.abs(d2 - b);
          if (diff2 < ans) ans = diff2;
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
