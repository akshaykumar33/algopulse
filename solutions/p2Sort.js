const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const [n, k] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);

    let ans = 0;
    let c = 0;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] < 2 * a[i + 1]) {
        c++;
      } else {
        c = 0;
      }
      if (c >= k) {
        ans++;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
