const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let n = parseInt(tokens[0], 10);
  let temp = n;
  let maxDigit = 0;

  while (temp > 0) {
    const d = temp % 10;
    if (d > maxDigit) maxDigit = d;
    temp = Math.floor(temp / 10);
  }

  const ans = new Array(maxDigit).fill(0);
  let place = 1;

  while (n > 0) {
    const digit = n % 10;
    for (let i = 0; i < digit; i++) {
      ans[i] += place;
    }
    n = Math.floor(n / 10);
    place *= 10;
  }

  console.log(maxDigit);
  console.log(ans.join(' '));
}

solve();

