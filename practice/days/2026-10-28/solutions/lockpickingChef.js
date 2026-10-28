const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const k = tokens[ptr++];

    let minMoves = Infinity;
    for (let i = 0; i <= n - m; i++) {
      let moves = 0;
      for (let j = 0; j < m; j++) {
        const d1 = s.charCodeAt(i + j) - 48;
        const d2 = k.charCodeAt(j) - 48;
        const diff = Math.abs(d1 - d2);
        moves += Math.min(diff, 10 - diff);
      }
      if (moves < minMoves) minMoves = moves;
    }

    out.push(minMoves);
  }

  console.log(out.join('\n'));
}

solve();

