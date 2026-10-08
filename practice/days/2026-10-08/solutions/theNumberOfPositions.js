const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 3) return;
  const n = parseInt(input[0], 10);
  const a = parseInt(input[1], 10);
  const b = parseInt(input[2], 10);
  const minPos = Math.max(a + 1, n - b);
  const ans = n - minPos + 1;
  console.log(ans);
}

solve();
