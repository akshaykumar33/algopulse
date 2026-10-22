const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length < 3 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = parseInt(input[2], 10);
  const arr = [];
  for (let i = 0; i <= m; i++) {
    arr.push(parseInt(input[3 + i], 10));
  }
  const fedor = arr[m];
  let ans = 0;
  for (let i = 0; i < m; i++) {
    let diff = arr[i] ^ fedor;
    let cnt = 0;
    while (diff > 0) {
      cnt += diff & 1;
      diff >>= 1;
    }
    if (cnt <= k) {
      ans++;
    }
  }
  console.log(ans);
}

solve();
