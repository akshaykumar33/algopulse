const fs = require('fs');
const solve = () => {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = BigInt(input);
  const rem = n % 4n;
  if (rem === 0n) {
    console.log(4);
  } else {
    console.log(0);
  }
};
solve();
