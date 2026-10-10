const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  for (let i = 1; i <= t; i++) {
    let [a, b] = input[i].trim().split(/\s+/).map(BigInt);
    if (a === b) {
      out.push(0);
      continue;
    }
    if (a > b) {
      const tmp = a;
      a = b;
      b = tmp;
    }
    if (b % a !== 0n) {
      out.push(-1);
      continue;
    }
    let k = b / a;
    let p = 0;
    while (k % 2n === 0n) {
      k /= 2n;
      p++;
    }
    if (k !== 1n) {
      out.push(-1);
    } else {
      out.push(Math.floor((p + 2) / 3));
    }
  }
  console.log(out.join('\n'));
}

solve();
