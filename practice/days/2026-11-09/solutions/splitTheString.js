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
    const s = tokens[ptr++];

    let zeros = 0;
    let ones = 0;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 48) {
        zeros++;
      } else {
        ones++;
      }
    }

    const diff = Math.abs(zeros - ones);
    const ans = Math.floor((diff + k - 1) / k);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
