const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    let n = BigInt(input[i]);
    while (true) {
      let temp = n;
      let ok = true;
      while (temp > 0n) {
        let d = temp % 10n;
        if (d !== 0n && n % d !== 0n) {
          ok = false;
          break;
        }
        temp /= 10n;
      }
      if (ok) {
        out.push(n.toString());
        break;
      }
      n++;
    }
  }
  console.log(out.join('\n'));
}

solve();
