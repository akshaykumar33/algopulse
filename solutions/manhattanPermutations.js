const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let k = BigInt(input[ptr++]);
    const m = Math.floor(n / 2);
    const maxK = 2n * BigInt(m) * BigInt(n - m);

    if (k % 2n !== 0n || k > maxK) {
      out.push('No');
      continue;
    }

    out.push('Yes');
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = i;

    let l = 1, r = n;
    while (l < r && k > 0n) {
      const diff = BigInt(2 * (r - l));
      if (k >= diff) {
        p[l] = r;
        p[r] = l;
        k -= diff;
        l++;
        r--;
      } else {
        const d = Number(k / 2n);
        p[l] = l + d;
        p[l + d] = l;
        k = 0n;
        break;
      }
    }

    const res = [];
    for (let i = 1; i <= n; i++) res.push(p[i]);
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

