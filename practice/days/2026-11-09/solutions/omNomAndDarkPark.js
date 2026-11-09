const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const totalNodes = (1 << (n + 1)) - 1;
  const a = new Int32Array(totalNodes + 1);

  for (let i = 2; i <= totalNodes; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }

  let ans = 0;
  for (let i = totalNodes; i > 1; i -= 2) {
    ans += Math.abs(a[i] - a[i - 1]);
    a[i >> 1] += Math.max(a[i], a[i - 1]);
  }

  console.log(ans);
}

solve();
