const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    let ones = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '1') ones++;
    }
    out.push(ones % 2 === 1 ? 'WIN' : 'LOSE');
  }

  console.log(out.join('\n'));
}

solve();
