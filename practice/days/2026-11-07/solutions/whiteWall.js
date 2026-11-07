const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  const perms = [
    'RGB', 'RBG', 'GRB', 'GBR', 'BRG', 'BGR'
  ];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let minFlips = n;
    for (let p = 0; p < 6; p++) {
      const perm = perms[p];
      let flips = 0;
      for (let i = 0; i < n; i++) {
        if (s[i] !== perm[i % 3]) flips++;
      }
      if (flips < minFlips) minFlips = flips;
    }

    out.push(minFlips);
  }

  console.log(out.join('\n'));
}

solve();
