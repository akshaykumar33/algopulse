const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || input.length === 0 || input[0] === '') return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const [n, k] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);
    const op = n - k + 1;
    let score = 0;
    if (n < 2 * k - 1) {
      for (let p = 0; p < op; p++) {
        score += Math.max(a[p], a[n - 1 - p]);
      }
    } else {
      let total = 0;
      for (let i = 0; i < n; i++) total += a[i];
      let minRemain = 0;
      for (let p = 0; p < k - 1; p++) {
        minRemain += Math.min(a[p], a[n - 1 - p]);
      }
      score = total - minRemain;
    }
    out.push(score);
  }

  console.log(out.join('\n'));
}

solve();
