const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const t = parseInt(tokens[0], 10);
  const out = [];

  for (let i = 1; i <= t; i++) {
    const n = parseInt(tokens[i], 10);
    let ans = n;
    let temp = n;

    for (let p = 2; p * p <= temp; p++) {
      if (temp % p === 0) {
        while (temp % p === 0) {
          temp = Math.floor(temp / p);
        }
        ans -= Math.floor(ans / p);
      }
    }
    if (temp > 1) {
      ans -= Math.floor(ans / temp);
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
