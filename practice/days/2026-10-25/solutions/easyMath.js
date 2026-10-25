const fs = require('fs');

function sumDigits(x) {
  let s = 0;
  while (x > 0) {
    s += x % 10;
    x = Math.floor(x / 10);
  }
  return s;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++], 10));

    let maxD = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const prod = a[i] * a[j];
        const sd = sumDigits(prod);
        if (sd > maxD) maxD = sd;
      }
    }
    out.push(maxD);
  }
  console.log(out.join('\n'));
}

solve();
