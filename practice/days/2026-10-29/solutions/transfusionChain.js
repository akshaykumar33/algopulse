const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let countO = 0;
    let countA = 0;
    let countB = 0;
    let countAB = 0;

    for (let i = 0; i < n; i++) {
      const type = input[ptr++];
      if (type === 'O') countO++;
      else if (type === 'A') countA++;
      else if (type === 'B') countB++;
      else if (type === 'AB') countAB++;
    }

    const ans = countO + Math.max(countA, countB) + countAB;
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

