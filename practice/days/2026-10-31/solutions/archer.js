const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const a = parseFloat(tokens[0]);
  const b = parseFloat(tokens[1]);
  const c = parseFloat(tokens[2]);
  const d = parseFloat(tokens[3]);
  const p1 = a / b;
  const p2 = c / d;
  const ans = p1 / (1 - (1 - p1) * (1 - p2));
  console.log(ans.toFixed(12));
}
solve();
