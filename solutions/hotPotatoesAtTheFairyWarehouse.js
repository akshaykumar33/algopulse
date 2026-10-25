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
    const s = input[lineIdx++].trim();
    const len = 2 * n;
    let red = 0;
    let blue = 0;

    for (let i = 0; i < len; i++) {
      if (s[i] === '1') {
        const nxt = (i + 1) % len;
        let pos = i;
        if (s[nxt] === '0') {
          pos = nxt;
        }
        if (pos % 2 === 0) red++;
        else blue++;
      }
    }

    out.push(`${blue} ${red}`);
  }

  console.log(out.join('\n'));
}

solve();
