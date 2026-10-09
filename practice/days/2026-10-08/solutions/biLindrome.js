const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;
  let t = parseInt(input[0], 10);
  let lineIdx = 1;
  const out = [];

  while (t-- > 0) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    const s = input[lineIdx++];
    const seen = new Set();
    let hasDup = false;
    for (let i = 0; i < n; i++) {
      if (seen.has(s[i])) {
        hasDup = true;
        break;
      }
      seen.add(s[i]);
    }
    if (hasDup) {
      out.push(n - 2);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
