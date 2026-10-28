const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = [];
    for (let i = 0; i < 16; i++) {
      s.push({ val: parseInt(tokens[ptr++], 10), idx: i });
    }

    s.sort((a, b) => a.val - b.val);

    const ans = new Array(16);
    for (let rank = 0; rank < 16; rank++) {
      let wins = 0;
      if (rank === 0) wins = 0;
      else if (rank <= 2) wins = 1;
      else if (rank <= 6) wins = 2;
      else if (rank <= 14) wins = 3;
      else wins = 4;
      ans[s[rank].idx] = wins;
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

