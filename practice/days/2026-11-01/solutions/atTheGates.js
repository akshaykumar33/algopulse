const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const coins = [];
    for (let i = 0; i < n; i++) {
      coins.push(tokens[ptr++]);
    }

    let flipped = 0;
    for (let i = n - 1; i >= n - k; i--) {
      let face = coins[i];
      if (flipped) face = face === 'H' ? 'T' : 'H';
      if (face === 'H') {
        flipped ^= 1;
      }
    }

    let countH = 0;
    for (let i = 0; i < n - k; i++) {
      let face = coins[i];
      if (flipped) face = face === 'H' ? 'T' : 'H';
      if (face === 'H') countH++;
    }

    out.push(countH);
  }

  console.log(out.join('\n'));
}

solve();

