const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let line = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const [n, m, k] = input[line++].trim().split(/\s+/).map(Number);
    const a = input[line++].trim().split(/\s+/).map(Number);
    const q = k > 0 ? input[line++].trim().split(/\s+/).map(Number) : [];

    if (k < n - 1) {
      out.push('0'.repeat(m));
    } else if (k === n) {
      out.push('1'.repeat(m));
    } else {
      let sum = 0;
      for (let i = 0; i < k; i++) sum += q[i];
      const total = (n * (n + 1)) / 2;
      const missing = total - sum;
      const res = [];
      for (let i = 0; i < m; i++) {
        res.push(a[i] === missing ? '1' : '0');
      }
      out.push(res.join(''));
    }
  }

  console.log(out.join('\n'));
}

solve();
