const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const board = input[ptr++];
    const pts = new Array(8);
    for (let i = 0; i < 8; i++) {
      pts[i] = BigInt(input[ptr++]);
    }

    let maxScore = 0n;
    for (let i = 0; i <= n - 8; i++) {
      let score = 0n;
      let mult = 1n;
      for (let j = 0; j < 8; j++) {
        const c = board[i + j];
        let p = pts[j];
        if (c === 'd') p *= 2n;
        else if (c === 't') p *= 3n;
        else if (c === 'D') mult *= 2n;
        else if (c === 'T') mult *= 3n;
        score += p;
      }
      const total = score * mult;
      if (total > maxScore) {
        maxScore = total;
      }
    }
    out.push(maxScore.toString());
  }

  console.log(out.join('\n'));
}

solve();
