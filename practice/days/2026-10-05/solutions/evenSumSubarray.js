const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    const arr = input[ptr++].split(' ').map(Number);
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += arr[j];
    }
    if (sum % 2 === 0) {
      out.push(n);
    } else {
      out.push(n - 1);
    }
  }
  console.log(out.join('\n'));
}

solve();
