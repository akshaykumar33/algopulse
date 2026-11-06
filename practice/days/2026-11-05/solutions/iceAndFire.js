const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    const ans = [];
    let consecutive = 1;
    for (let i = 0; i < n - 1; i++) {
      if (i > 0 && s[i] === s[i - 1]) {
        consecutive++;
      } else {
        consecutive = 1;
      }
      ans.push((i + 2) - consecutive);
    }
    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
