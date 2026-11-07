const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 5 || tokens[0] === '') return;
  const r = parseInt(tokens[0], 10);
  const x1 = parseInt(tokens[1], 10);
  const y1 = parseInt(tokens[2], 10);
  const x2 = parseInt(tokens[3], 10);
  const y2 = parseInt(tokens[4], 10);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  const ans = Math.ceil(dist / (2 * r));
  console.log(ans);
}

solve();
