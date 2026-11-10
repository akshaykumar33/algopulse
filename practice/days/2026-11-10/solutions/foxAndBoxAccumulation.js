const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const x = [];
  for (let i = 1; i <= n; i++) {
    x.push(parseInt(input[i], 10));
  }
  x.sort((a, b) => a - b);

  const piles = [];
  for (let i = 0; i < n; i++) {
    let bestIdx = -1;
    let minH = 100000;
    for (let j = 0; j < piles.length; j++) {
      if (piles[j] <= x[i] && piles[j] < minH) {
        minH = piles[j];
        bestIdx = j;
      }
    }
    if (bestIdx !== -1) {
      piles[bestIdx]++;
    } else {
      piles.push(1);
    }
  }

  console.log(piles.length);
}

solve();

