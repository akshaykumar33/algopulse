const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseFloat(input[ptr++]);
  const a = new Float64Array(n);
  for (let i = 0; i < n; i++) a[i] = parseFloat(input[ptr++]);

  const retain = 1 - k / 100;
  let low = 0;
  let high = 1000;

  for (let iter = 0; iter < 100; iter++) {
    const mid = (low + high) / 2;
    let surplus = 0;
    let deficit = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] > mid) {
        surplus += (a[i] - mid) * retain;
      } else {
        deficit += mid - a[i];
      }
    }
    if (surplus >= deficit) {
      low = mid;
    } else {
      high = mid;
    }
  }

  console.log(low.toFixed(9));
}

solve();
