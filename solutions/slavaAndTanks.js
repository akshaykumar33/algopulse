const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);
  const ans = [];
  for (let i = 2; i <= n; i += 2) ans.push(i);
  for (let i = 1; i <= n; i += 2) ans.push(i);
  for (let i = 2; i <= n; i += 2) ans.push(i);
  console.log(ans.length);
  console.log(ans.join(' '));
}
solve();