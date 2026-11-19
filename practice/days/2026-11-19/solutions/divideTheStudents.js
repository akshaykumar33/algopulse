const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = Number(input[ptr++]);
    const b = Number(input[ptr++]);
    const c = Number(input[ptr++]);

    function check(M) {
      if (a > 2 * M || c > 2 * M) return false;
      const remA = Math.max(0, a - M);
      const remC = Math.max(0, c - M);
      const cap1 = M - Math.min(a, M);
      const cap3 = M - Math.min(c, M);
      const remB = Math.max(0, b - cap1 - cap3);
      return remA + remC + remB <= M;
    }

    let low = Math.ceil((a + b + c) / 3);
    let high = a + b + c;
    let ans = high;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (check(mid)) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
