const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const top = input[ptr++];
    const bot = input[ptr++];
    let possible = false;

    for (let mask = 0; mask < 8; mask++) {
      const c0 = (mask & 1) ? bot[0] : top[0];
      const c1 = (mask & 2) ? bot[1] : top[1];
      const c2 = (mask & 4) ? bot[2] : top[2];
      const chars = [c0, c1, c2].sort().join('');
      if (chars === 'bbo') {
        possible = true;
        break;
      }
    }

    out.push(possible ? 'yes' : 'no');
  }

  console.log(out.join('\n'));
}

solve();

