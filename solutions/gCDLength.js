const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const t = parseInt(input[line++]);
  const out = [];

  for (let i = 0; i < t; i++) {
    const [a, b] = input[line++].split(' ').map(Number);

    let x = 1;
    for (let j = 0; j < a - 1; j++) {
      x *= 10;
    }

    let y = 1;
    for (let j = 0; j < b - 1; j++) {
      y *= 10;
    }
    y++; // Ensure y is not a multiple of 10, making gcd(x,y) potentially 1

    // If a=1, x=1. If b=1, y=1 (then y++ makes it 2). This works.
    // x will be 10^(a-1), y will be 10^(b-1)+1.
    // gcd(10^(a-1), 10^(b-1)+1) = gcd(10^(a-1), 1) = 1.
    // This ensures gcd has 1 digit.
    // x has 'a' digits (1 followed by a-1 zeros).
    // y has 'b' digits (1 followed by b-2 zeros, then 11, or 1 followed by b-1 zeros, then 1).
    // Specifically, 10^(b-1)+1 has 'b' digits. E.g., b=1 -> 1+1=2 (1 digit). b=2 -> 10+1=11 (2 digits).

    out.push(`${x} ${y}`);
  }

  console.log(out.join('\n'));
}

solve();
