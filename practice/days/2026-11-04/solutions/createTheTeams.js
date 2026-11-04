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
    const [n, x] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const a = input[lineIdx++].trim().split(/\s+/).map(Number);

    a.sort((u, v) => v - u);

    let ans = 0;
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      cnt++;
      if (cnt * a[i] >= x) {
        ans++;
        cnt = 0;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
