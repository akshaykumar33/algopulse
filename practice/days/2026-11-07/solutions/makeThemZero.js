const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let orSum = 0;

    for (let i = 0; i < n; i++) {
      orSum |= parseInt(tokens[ptr++], 10);
    }

    let cnt = 0;
    while (orSum > 0) {
      cnt += orSum & 1;
      orSum >>>= 1;
    }

    out.push(cnt);
  }

  console.log(out.join('\n'));
}

solve();
