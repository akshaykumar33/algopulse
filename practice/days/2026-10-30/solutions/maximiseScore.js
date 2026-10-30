const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(input[ptr++], 10));
    }

    if (n === 1) {
      out.push(0);
      continue;
    }

    let minScore = Infinity;
    for (let i = 0; i < n; i++) {
      let curScore;
      if (i === 0) {
        curScore = Math.abs(arr[0] - arr[1]);
      } else if (i === n - 1) {
        curScore = Math.abs(arr[n - 1] - arr[n - 2]);
      } else {
        curScore = Math.max(Math.abs(arr[i] - arr[i - 1]), Math.abs(arr[i] - arr[i + 1]));
      }
      if (curScore < minScore) {
        minScore = curScore;
      }
    }

    out.push(minScore);
  }

  console.log(out.join('\n'));
}

solve();

