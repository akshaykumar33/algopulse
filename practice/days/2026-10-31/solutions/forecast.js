const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const a = parseFloat(tokens[0]);
  const b = parseFloat(tokens[1]);
  const c = parseFloat(tokens[2]);
  const disc = Math.sqrt(b * b - 4 * a * c);
  let x1 = (-b + disc) / (2 * a);
  let x2 = (-b - disc) / (2 * a);
  if (x1 < x2) {
    const temp = x1;
    x1 = x2;
    x2 = temp;
  }
  console.log(x1.toFixed(6));
  console.log(x2.toFixed(6));
}
solve();
