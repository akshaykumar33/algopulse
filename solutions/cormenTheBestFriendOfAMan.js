const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || input[0] === '') return;
  const [n, k] = input[0].trim().split(/\s+/).map(Number);
  const a = input[1].trim().split(/\s+/).map(Number);

  let extra = 0;
  for (let i = 0; i < n - 1; i++) {
    const sum = a[i] + a[i + 1];
    if (sum < k) {
      const diff = k - sum;
      extra += diff;
      a[i + 1] += diff;
    }
  }

  console.log(extra);
  console.log(a.join(' '));
}

solve();
