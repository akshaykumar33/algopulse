const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;

  const n = Number(input[0]);
  const k = Number(input[1]);

  if (n < 3 * k) {
    console.log(-1);
    return;
  }

  const ans = new Int32Array(n);
  for (let i = 0; i < k; i++) ans[i] = i + 1;
  for (let i = 0; i < k; i++) ans[k + i] = i + 1;
  for (let i = 0; i < k; i++) {
    ans[2 * k + i] = ((i + 1) % k) + 1;
  }
  for (let i = 3 * k; i < n; i++) {
    ans[i] = 1;
  }

  console.log(ans.join(' '));
}

solve();
