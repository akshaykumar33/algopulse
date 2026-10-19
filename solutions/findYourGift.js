const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let x = 0;
    let y = 0;
    let lastAxis = '';

    for (let i = 0; i < n; i++) {
      const c = s[i];
      if (c === 'L' || c === 'R') {
        if (lastAxis !== 'H') {
          if (c === 'L') x--;
          else x++;
          lastAxis = 'H';
        }
      } else if (c === 'U' || c === 'D') {
        if (lastAxis !== 'V') {
          if (c === 'U') y++;
          else y--;
          lastAxis = 'V';
        }
      }
    }

    out.push(`${x} ${y}`);
  }

  console.log(out.join('\n'));
}

solve();
