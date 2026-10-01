const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (input.length === 0 || input[0] === '') return;

  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[lineIdx++], 10);
    const s = input[lineIdx++].trim();

    const seen = new Set();
    let possible = true;

    for (let j = 0; j < n; j++) {
      if (j > 0 && s[j] === s[j - 1]) {
        continue;
      }
      if (seen.has(s[j])) {
        possible = false;
        break;
      }
      seen.add(s[j]);
    }

    if (possible) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
