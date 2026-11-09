const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let temp = BigInt(input[0]);
  const factors = [];

  for (let i = 2n; i * i <= temp; i++) {
    while (temp % i === 0n) {
      factors.push(i);
      temp /= i;
      if (factors.length === 2 && temp > 1n) {
        console.log('1\n' + (factors[0] * factors[1]).toString());
        return;
      }
    }
  }

  if (temp > 1n) {
    factors.push(temp);
  }

  if (factors.length <= 1) {
    console.log('1\n0');
  } else if (factors.length === 2) {
    console.log('2');
  } else {
    console.log('1\n' + (factors[0] * factors[1]).toString());
  }
}

solve();
