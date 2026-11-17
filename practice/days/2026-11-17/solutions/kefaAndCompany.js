const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const d = parseInt(tokens[ptr++], 10);

  const arr = [];
  for (let i = 0; i < n; i++) {
    const m = parseInt(tokens[ptr++], 10);
    const s = parseInt(tokens[ptr++], 10);
    arr.push({ m, s });
  }

  arr.sort((a, b) => a.m - b.m);

  let l = 0;
  let sum = 0;
  let ans = 0;

  for (let r = 0; r < n; r++) {
    sum += arr[r].s;
    while (arr[r].m - arr[l].m >= d) {
      sum -= arr[l].s;
      l++;
    }
    if (sum > ans) {
      ans = sum;
    }
  }

  console.log(ans);
}

solve();
