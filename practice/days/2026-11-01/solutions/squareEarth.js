const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const x1 = parseInt(tokens[ptr++], 10);
  const y1 = parseInt(tokens[ptr++], 10);
  const x2 = parseInt(tokens[ptr++], 10);
  const y2 = parseInt(tokens[ptr++], 10);

  function getDist(x, y) {
    if (y === 0) return x;
    if (x === n) return n + y;
    if (y === n) return 3 * n - x;
    return 4 * n - y;
  }

  const d1 = getDist(x1, y1);
  const d2 = getDist(x2, y2);
  const diff = Math.abs(d1 - d2);
  const ans = Math.min(diff, 4 * n - diff);

  console.log(ans);
}

solve();

