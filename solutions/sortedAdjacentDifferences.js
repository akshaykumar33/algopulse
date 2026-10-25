const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  let out = [];
  while (t--) {
    let n = parseInt(input[ptr++], 10);
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(input[ptr++], 10));
    }
    arr.sort((a, b) => a - b);
    let res = [];
    let l = 0, r = n - 1;
    while (l <= r) {
      if (l === r) {
        res.push(arr[l]);
        break;
      }
      res.push(arr[r]);
      res.push(arr[l]);
      l++;
      r--;
    }
    res.reverse();
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
