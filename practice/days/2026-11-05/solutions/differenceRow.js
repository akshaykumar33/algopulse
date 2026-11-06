const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const arr = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = parseInt(tokens[ptr++], 10);
  }
  arr.sort();
  const tmp = arr[0];
  arr[0] = arr[n - 1];
  arr[n - 1] = tmp;
  console.log(arr.join(' '));
}

solve();
