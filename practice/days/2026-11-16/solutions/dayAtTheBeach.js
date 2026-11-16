const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const h = new Int32Array(n);
  for (let i = 0; i < n; i++) h[i] = parseInt(input[ptr++], 10);

  const prefMax = new Int32Array(n);
  prefMax[0] = h[0];
  for (let i = 1; i < n; i++) {
    prefMax[i] = Math.max(prefMax[i - 1], h[i]);
  }

  const suffMin = new Int32Array(n);
  suffMin[n - 1] = h[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffMin[i] = Math.min(suffMin[i + 1], h[i]);
  }

  let ans = 1;
  for (let i = 0; i < n - 1; i++) {
    if (prefMax[i] <= suffMin[i + 1]) {
      ans++;
    }
  }
  console.log(ans);
}

solve();
