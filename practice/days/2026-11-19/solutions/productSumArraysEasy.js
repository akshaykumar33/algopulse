const fs = require('fs');

function countFact(n, minF) {
  let count = 1;
  for (let f = minF; f * f <= n; f++) {
    if (n % f === 0) {
      count += countFact(n / f, f);
      if (count >= 3) return 3;
    }
  }
  return count;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const N = parseInt(input[ptr++], 10);
    if (N === 1) {
      out.push(1);
    } else {
      out.push(Math.min(3, countFact(N, 2)));
    }
  }

  console.log(out.join('\n'));
}

solve();
