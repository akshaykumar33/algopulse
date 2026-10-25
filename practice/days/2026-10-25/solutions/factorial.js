const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t && i < input.length; i++) {
    let n = parseInt(input[i], 10);
    let ans = 0;
    while (n >= 5) {
      n = Math.floor(n / 5);
      ans += n;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
