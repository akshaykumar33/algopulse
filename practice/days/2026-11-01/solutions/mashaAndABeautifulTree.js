const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const m = parseInt(tokens[ptr++], 10);
    const arr = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    function check(l, r) {
      if (r - l === 1) {
        return { ops: 0, min: arr[l], max: arr[l] };
      }
      const mid = (l + r) >> 1;
      const left = check(l, mid);
      if (left.ops === -1) return { ops: -1 };
      const right = check(mid, r);
      if (right.ops === -1) return { ops: -1 };

      if (left.max < right.min) {
        return { ops: left.ops + right.ops, min: left.min, max: right.max };
      } else if (right.max < left.min) {
        return { ops: left.ops + right.ops + 1, min: right.min, max: left.max };
      } else {
        return { ops: -1 };
      }
    }

    const res = check(0, m);
    out.push(res.ops);
  }

  console.log(out.join('\n'));
}

solve();

