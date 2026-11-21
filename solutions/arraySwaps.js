const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  let minA = Infinity;
  for (let i = 0; i < n; i++) {
    const val = parseInt(input[ptr++], 10);
    if (val < minA) minA = val;
  }
  let countB = 0;
  for (let j = 0; j < m; j++) {
    const val = parseInt(input[ptr++], 10);
    if (val < minA) countB++;
  }
  const ans = BigInt(n) * BigInt(countB);
  console.log(ans.toString());
}
solve();