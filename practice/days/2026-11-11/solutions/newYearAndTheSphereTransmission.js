const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const bn = BigInt(n);
  const ans = [];

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      const d1 = BigInt(i);
      const m1 = bn / d1;
      ans.push(m1 + d1 * (m1 * (m1 - 1n) / 2n));
      if (i * i !== n) {
        const d2 = BigInt(n / i);
        const m2 = bn / d2;
        ans.push(m2 + d2 * (m2 * (m2 - 1n) / 2n));
      }
    }
  }

  ans.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
  console.log(ans.map((v) => v.toString()).join(' '));
}

solve();
