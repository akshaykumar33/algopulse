const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const [n, k] = lines[ptr++].split(' ').map(Number);
    const arr = lines[ptr++].split(' ').map(Number);
    let sum = 0;
    for (let j = 0; j < k; j++) {
      sum += arr[j];
    }
    let maxsum = sum;
    for (let j = k; j < n; j++) {
      sum += arr[j] - arr[j - k];
      if (sum > maxsum) {
        maxsum = sum;
      }
    }
    out.push(maxsum);
  }
  console.log(out.join('\n'));
}

solve();
