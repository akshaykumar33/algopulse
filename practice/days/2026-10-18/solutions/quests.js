const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    if (n === null || k === null) break;

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = nextInt();

    let maxTotal = 0;
    let sumA = 0;
    let maxB = 0;
    const limit = Math.min(n, k);

    for (let i = 0; i < limit; i++) {
      sumA += a[i];
      if (b[i] > maxB) maxB = b[i];
      const remaining = k - (i + 1);
      const total = sumA + remaining * maxB;
      if (total > maxTotal) maxTotal = total;
    }

    out.push(maxTotal);
  }

  console.log(out.join('\n'));
}

solve();
