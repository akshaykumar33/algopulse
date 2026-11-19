const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const N = parseInt(input[ptr++], 10);
    const K = parseInt(input[ptr++], 10);
    const S = parseInt(input[ptr++], 10);

    if (K > N) {
      out.push(-1);
      continue;
    }
    if (S >= 7 && 6 * N < 7 * K) {
      out.push(-1);
      continue;
    }
    const needed = S * K;
    out.push(Math.ceil(needed / N));
  }

  console.log(out.join('\n'));
}

solve();
