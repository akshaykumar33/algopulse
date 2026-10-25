const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const primeCounts = new Map();

    for (let i = 0; i < n; i++) {
      let val = parseInt(input[ptr++], 10);

      for (let d = 2; d * d <= val; d++) {
        if (val % d === 0) {
          let cnt = 0;
          while (val % d === 0) {
            cnt++;
            val /= d;
          }
          primeCounts.set(d, (primeCounts.get(d) || 0) + cnt);
        }
      }
      if (val > 1) {
        primeCounts.set(val, (primeCounts.get(val) || 0) + 1);
      }
    }

    let ok = true;
    for (const count of primeCounts.values()) {
      if (count % n !== 0) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
