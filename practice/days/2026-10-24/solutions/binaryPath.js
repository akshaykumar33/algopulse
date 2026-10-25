const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    const row0 = input[lineIdx++].trim();
    const row1 = input[lineIdx++].trim();

    let R = n - 1;
    for (let i = 0; i < n - 1; i++) {
      if (row0[i + 1] > row1[i]) {
        R = i;
        break;
      }
    }

    let L = R;
    while (L > 0 && row0[L] === row1[L - 1]) {
      L--;
    }

    const count = R - L + 1;
    const pathStr = row0.slice(0, R + 1) + row1.slice(R);

    out.push(pathStr);
    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
