const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    const a = new Int32Array(n);
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    for (let i = 0; i < n; i++) b[i] = nextInt();

    a.sort();
    b.sort();

    const start = Math.floor(n / 2);
    let ans = Infinity;
    let j = n - 1;

    for (let i = start; i < n; i++) {
      const sum = a[i] + b[j];
      if (sum < ans) ans = sum;
      j--;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
