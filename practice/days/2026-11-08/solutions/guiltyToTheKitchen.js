const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const V = parseFloat(tokens[1]);

  let idx = 2;
  const a = new Float64Array(n);
  let sumA = 0;
  for (let i = 0; i < n; i++) {
    a[i] = parseFloat(tokens[idx++]);
    sumA += a[i];
  }

  const b = new Float64Array(n);
  let minRatio = V / sumA;
  for (let i = 0; i < n; i++) {
    b[i] = parseFloat(tokens[idx++]);
    const ratio = b[i] / a[i];
    if (ratio < minRatio) {
      minRatio = ratio;
    }
  }

  const ans = minRatio * sumA;
  console.log(ans.toFixed(5));
}

solve();
