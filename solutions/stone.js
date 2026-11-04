const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const a = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseFloat(input[ptr++]);
  }

  if (k === 0) {
    console.log(Array.from(a).join(' '));
    return;
  }

  let maxVal = a[0];
  for (let i = 1; i < n; i++) {
    if (a[i] > maxVal) maxVal = a[i];
  }
  for (let i = 0; i < n; i++) {
    a[i] = maxVal - a[i];
  }

  if (k % 2 === 0) {
    maxVal = a[0];
    for (let i = 1; i < n; i++) {
      if (a[i] > maxVal) maxVal = a[i];
    }
    for (let i = 0; i < n; i++) {
      a[i] = maxVal - a[i];
    }
  }

  console.log(Array.from(a).join(' '));
}

solve();

