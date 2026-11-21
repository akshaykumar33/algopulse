const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const P = 100003;
  const out = [];
  out.push(P + ' ' + P);
  for (let i = 1; i <= n - 2; i++) {
    out.push(i + ' ' + (i + 1) + ' 1');
  }
  const lastWeight = P - (n - 2);
  out.push((n - 1) + ' ' + n + ' ' + lastWeight);
  let edgesLeft = m - (n - 1);
  for (let i = 1; i <= n && edgesLeft > 0; i++) {
    for (let j = i + 2; j <= n && edgesLeft > 0; j++) {
      out.push(i + ' ' + j + ' 1000000000');
      edgesLeft--;
    }
  }
  console.log(out.join('\n'));
}
solve();