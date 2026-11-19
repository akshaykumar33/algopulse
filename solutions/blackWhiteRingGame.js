const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const A = new Uint8Array(n);
    let c0 = 0, c1 = 0;
    for (let i = 0; i < n; i++) {
      A[i] = parseInt(input[ptr++], 10);
      if (A[i] === 0) c0++;
      else c1++;
    }

    let diff = 0;
    for (let i = 0; i < n; i++) {
      const next = i === n - 1 ? 0 : i + 1;
      if (A[i] !== A[next]) diff++;
    }

    const maxDiff = 2 * Math.min(c0, c1);
    const moves = (maxDiff - diff) / 2;

    out.push(moves % 2 === 1 ? 'Alice' : 'Bob');
  }

  console.log(out.join('\n'));
}

solve();
