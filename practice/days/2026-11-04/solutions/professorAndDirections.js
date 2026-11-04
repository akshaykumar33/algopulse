const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let found = false;
    for (let i = 0; i < n - 1; i++) {
      if ((s[i] === 'L' && s[i + 1] === 'L') || (s[i] === 'R' && s[i + 1] === 'R')) {
        found = true;
        break;
      }
    }

    out.push(found ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

