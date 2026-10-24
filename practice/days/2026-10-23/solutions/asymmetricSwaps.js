const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = 2 * n;
    const arr = new Int32Array(m);
    for (let i = 0; i < m; i++) {
      arr[i] = parseInt(input[ptr++], 10);
    }

    arr.sort();

    let minDiff = Infinity;
    for (let j = 0; j <= n; j++) {
      const diff = arr[j + n - 1] - arr[j];
      if (diff < minDiff) minDiff = diff;
    }

    out.push(minDiff);
  }

  console.log(out.join('\n'));
}

solve();
