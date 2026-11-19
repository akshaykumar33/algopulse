const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const k = Number(input[ptr++]);
    const s = input[ptr++];
    const a = new Int32Array(n);
    let maxA = 0;

    for (let i = 0; i < n; i++) {
      const v = Number(input[ptr++]);
      a[i] = v;
      if (v > maxA) maxA = v;
    }

    function check(mid) {
      let ops = 0;
      let inB = false;

      for (let i = 0; i < n; i++) {
        if (a[i] > mid) {
          if (s[i] === 'B') {
            if (!inB) {
              ops++;
              inB = true;
            }
          } else {
            inB = false;
          }
        }
      }

      return ops <= k;
    }

    let low = 0;
    let high = maxA;
    let best = maxA;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (check(mid)) {
        best = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    out.push(best);
  }

  console.log(out.join('\n'));
}

solve();
