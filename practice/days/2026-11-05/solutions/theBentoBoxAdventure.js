const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const a = parseInt(tokens[ptr++], 10);
  const b = parseInt(tokens[ptr++], 10);
  const c = parseInt(tokens[ptr++], 10);
  const d = parseInt(tokens[ptr++], 10);
  const sum = a + b + c + d;
  const ans = 15 - sum;
  console.log(ans);
}
solve();
