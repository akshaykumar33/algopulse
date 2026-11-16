const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const u = parseInt(input[ptr++], 10);
  const e = new Int32Array(n);
  for (let i = 0; i < n; i++) e[i] = parseInt(input[ptr++], 10);

  let best = -1;
  let k = 0;

  for (let i = 0; i < n - 2; i++) {
    while (k + 1 < n && e[k + 1] - e[i] <= u) {
      k++;
    }
    if (k >= i + 2) {
      const val = (e[k] - e[i + 1]) / (e[k] - e[i]);
      if (val > best) best = val;
    }
  }

  if (best < 0) {
    console.log(-1);
  } else {
    console.log(best.toFixed(10));
  }
}

solve();
