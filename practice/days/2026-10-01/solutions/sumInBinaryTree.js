const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    const line = input[i]?.trim();
    if (!line) continue;
    let n = BigInt(line);
    let sum = 0n;
    while (n > 0n) {
      sum += n;
      n /= 2n;
    }
    out.push(sum.toString());
  }
  console.log(out.join('\n'));
}

solve();
