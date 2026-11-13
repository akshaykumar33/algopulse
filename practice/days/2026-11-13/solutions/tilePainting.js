const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = BigInt(input);

  if (n === 1n) {
    console.log('1');
    return;
  }

  let temp = n;
  let p = -1n;
  let count = 0;

  for (let d = 2n; d * d <= temp; d++) {
    if (temp % d === 0n) {
      count++;
      p = d;
      while (temp % d === 0n) {
        temp /= d;
      }
    }
  }

  if (temp > 1n) {
    count++;
    p = temp;
  }

  if (count === 1) {
    console.log(p.toString());
  } else {
    console.log('1');
  }
}

solve();
