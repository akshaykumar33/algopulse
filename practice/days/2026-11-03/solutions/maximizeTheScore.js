const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let j = 0; j < n; j++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }

    let maxScore = 0;

    if (k === 1) {
      for (let j = 0; j < n; j++) {
        maxScore = Math.max(maxScore, arr[j]);
      }
    } else if (k >= n) {
      for (let j = 0; j < n; j++) {
        maxScore = Math.max(maxScore, arr[j]);
      }
    } else {
      let currentSum = 0;
      for (let j = 0; j < k; j++) {
        currentSum += arr[j];
      }
      maxScore = currentSum;

      for (let j = k; j < n; j++) {
        currentSum = currentSum - arr[j - k] + arr[j];
        maxScore = Math.max(maxScore, currentSum);
      }
    }

    out.push(maxScore);
  }
  console.log(out.join('\n'));
}

solve();
