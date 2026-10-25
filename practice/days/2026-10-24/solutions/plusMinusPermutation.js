const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let i = 1; i <= t; i++) {
    if (i >= input.length) break;
    const [n, x, y] = input[i].trim().split(/\s+/).map(BigInt);
    const g = gcd(x, y);
    const lcm = (x * y) / g;

    const both = n / lcm;
    const cntX = n / x - both;
    const cntY = n / y - both;

    const sumX = cntX * n - (cntX * (cntX - 1n)) / 2n;
    const sumY = (cntY * (cntY + 1n)) / 2n;

    out.push((sumX - sumY).toString());
  }

  console.log(out.join('\n'));
}

solve();
