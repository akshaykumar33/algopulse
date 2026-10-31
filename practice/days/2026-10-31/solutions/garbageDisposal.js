const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const k = BigInt(tokens[ptr++]);

  let bags = 0n;
  let rem = 0n;

  for (let i = 0; i < n; i++) {
    const a = BigInt(tokens[ptr++]);

    if (rem > 0n) {
      const total = rem + a;
      if (total < k) {
        bags += 1n;
        rem = 0n;
      } else {
        const take = total / k;
        bags += take;
        rem = total % k;
      }
    } else {
      const take = a / k;
      bags += take;
      rem = a % k;
    }
  }

  if (rem > 0n) {
    bags += 1n;
  }

  console.log(bags.toString());
}

solve();
