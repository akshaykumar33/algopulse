const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const l = parseInt(input[1], 10);
  const r = parseInt(input[2], 10);
  const x = parseInt(input[3], 10);

  const c = new Array(n);
  for (let i = 0; i < n; i++) {
    c[i] = parseInt(input[4 + i], 10);
  }

  let ans = 0;
  const total = 1 << n;

  for (let mask = 1; mask < total; mask++) {
    let sum = 0;
    let minVal = Infinity;
    let maxVal = -Infinity;
    let cnt = 0;

    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        const val = c[i];
        sum += val;
        if (val < minVal) minVal = val;
        if (val > maxVal) maxVal = val;
        cnt++;
      }
    }

    if (cnt >= 2 && sum >= l && sum <= r && (maxVal - minVal) >= x) {
      ans++;
    }
  }

  console.log(ans);
}

solve();
