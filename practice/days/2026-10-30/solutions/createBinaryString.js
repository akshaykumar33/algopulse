const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    const d = parseInt(input[ptr++], 10);
    const bestSub = Math.max(c, d);
    let maxCoins = 0;

    for (let x = 0; x <= n; x++) {
      const y = n - x;
      const coins = x * a + y * b + x * y * bestSub;
      if (coins > maxCoins) {
        maxCoins = coins;
      }
    }

    out.push(maxCoins);
  }

  console.log(out.join('\n'));
}

solve();

