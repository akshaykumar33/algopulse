const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const MAXN = 200005;
  const LOG = 18;
  const st = new Array(LOG);
  for (let j = 0; j < LOG; j++) {
    st[j] = new Int32Array(MAXN);
  }

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const st0 = st[0];
    for (let i = 0; i < n; i++) {
      st0[i] = parseInt(tokens[ptr++], 10);
    }

    let maxJ = 0;
    while ((1 << (maxJ + 1)) <= n) {
      maxJ++;
    }

    for (let j = 1; j <= maxJ; j++) {
      const half = 1 << (j - 1);
      const limit = n - (1 << j);
      const prev = st[j - 1];
      const cur = st[j];
      for (let i = 0; i <= limit; i++) {
        cur[i] = prev[i] & prev[i + half];
      }
    }

    const q = parseInt(tokens[ptr++], 10);
    const res = new Array(q);

    for (let qi = 0; qi < q; qi++) {
      const l = parseInt(tokens[ptr++], 10) - 1;
      const k = parseInt(tokens[ptr++], 10);

      if (st0[l] < k) {
        res[qi] = -1;
        continue;
      }

      let pos = l;
      let val = 0x7fffffff;
      for (let j = maxJ; j >= 0; j--) {
        const len = 1 << j;
        if (pos + len <= n) {
          const nextVal = val & st[j][pos];
          if (nextVal >= k) {
            val = nextVal;
            pos += len;
          }
        }
      }
      res[qi] = pos;
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
