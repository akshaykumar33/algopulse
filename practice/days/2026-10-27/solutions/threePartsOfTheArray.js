const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const d = [];
  for (let i = 0; i < n; i++) {
    d.push(parseInt(tokens[ptr++], 10));
  }

  let l = 0, r = n - 1;
  let sumL = d[0], sumR = d[n - 1];
  let ans = 0;

  while (l < r) {
    if (sumL === sumR) {
      ans = sumL;
      l++;
      r--;
      sumL += d[l];
      sumR += d[r];
    } else if (sumL < sumR) {
      l++;
      sumL += d[l];
    } else {
      r--;
      sumR += d[r];
    }
  }

  console.log(ans);
}

solve();
