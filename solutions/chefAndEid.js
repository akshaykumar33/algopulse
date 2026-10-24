const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(input[ptr++], 10);
    }

    arr.sort();

    let minDiff = Infinity;
    for (let i = 0; i < n - 1; i++) {
      const diff = arr[i + 1] - arr[i];
      if (diff < minDiff) {
        minDiff = diff;
        if (minDiff === 0) break;
      }
    }

    out.push(minDiff);
  }

  console.log(out.join('\n'));
}

solve();
