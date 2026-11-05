const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);

    let countA = 0;
    let countB = 0;
    let countBoth = 0;

    for (let i = 0; i < n; i++) {
      const val = parseInt(input[ptr++], 10);
      const divA = val % a === 0;
      const divB = val % b === 0;
      if (divA && divB) {
        countBoth++;
      } else if (divA) {
        countA++;
      } else if (divB) {
        countB++;
      }
    }

    if (countBoth > 0) {
      countA++;
    }

    if (countA > countB) {
      out.push('BOB');
    } else {
      out.push('ALICE');
    }
  }

  console.log(out.join('\n'));
}

solve();
