const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    const b = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
    }

    b.sort();

    let prev = -Infinity;
    let ok = true;

    for (let i = 0; i < n; i++) {
      const cur = a[i];
      let best = Infinity;

      if (cur >= prev) {
        best = cur;
      }

      const target = prev + cur;
      let low = 0;
      let high = m - 1;
      let foundIdx = -1;
      while (low <= high) {
        const mid = (low + high) >> 1;
        if (b[mid] >= target) {
          foundIdx = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      if (foundIdx !== -1) {
        const cand = b[foundIdx] - cur;
        if (cand < best) {
          best = cand;
        }
      }

      if (best === Infinity) {
        ok = false;
        break;
      }

      prev = best;
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

