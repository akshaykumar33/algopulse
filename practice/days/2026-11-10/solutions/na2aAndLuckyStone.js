const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const n = parseInt(tokens[0], 10);
  const out = [];

  for (let i = 1; i <= n; i++) {
    let a = BigInt(tokens[i]);
    let temp = a;
    let cnt2 = 0;
    while (temp > 0n && temp % 2n === 0n) {
      cnt2++;
      temp /= 2n;
    }
    let cnt5 = 0;
    while (temp > 0n && temp % 5n === 0n) {
      cnt5++;
      temp /= 5n;
    }

    while (cnt2 < cnt5) {
      a *= 4n;
      cnt2 += 2;
    }

    out.push(a.toString());
  }

  console.log(out.join('\n'));
}

solve();
