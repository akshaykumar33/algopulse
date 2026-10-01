const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const coins = [100, 50, 10, 5, 2, 1];
  const out = [];

  for (let i = 1; i <= t; i++) {
    const line = input[i]?.trim();
    if (!line) continue;
    let n = parseInt(line, 10);
    let count = 0;
    for (const c of coins) {
      if (n >= c) {
        count += Math.floor(n / c);
        n %= c;
      }
    }
    out.push(count.toString());
  }

  console.log(out.join('\n'));
}

solve();
