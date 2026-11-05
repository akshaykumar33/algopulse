const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const a = 1234567;
  const b = 123456;
  const c = 1234;
  let found = false;
  for (let i = 0; i * a <= n; i++) {
    const rem1 = n - i * a;
    for (let j = 0; j * b <= rem1; j++) {
      const rem2 = rem1 - j * b;
      if (rem2 % c === 0) {
        found = true;
        break;
      }
    }
    if (found) break;
  }
  console.log(found ? "YES" : "NO");
}
solve();
