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
    const n = parseInt(input[lineIdx++].trim(), 10);
    const unprintedTokens = input[lineIdx++].trim().split(/\s+/).map(Number);
    const f = unprintedTokens[0];
    const leavesTorn = parseInt(input[lineIdx++].trim(), 10);

    const l = n / 2;
    let sTot = (n * (n + 1)) / 2;
    for (let i = 1; i <= f; i++) {
      sTot -= unprintedTokens[i];
    }

    const expected = (sTot * (l - leavesTorn)) / l;
    out.push(expected.toFixed(4));
  }

  console.log(out.join('\n'));
}

solve();
