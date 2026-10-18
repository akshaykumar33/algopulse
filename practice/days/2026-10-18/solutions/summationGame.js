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
    const x = nextInt();
    if (n === null || k === null || x === null) break;

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    a.sort();
    for (let i = 0, j = n - 1; i < j; i++, j--) {
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }

    const pref = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
      pref[i + 1] = pref[i] + a[i];
    }

    let maxSum = -Infinity;
    for (let p = 0; p <= k; p++) {
      const r = Math.min(n, p + x);
      const sumNeg = pref[r] - pref[p];
      const sumPos = pref[n] - pref[r];
      const cur = sumPos - sumNeg;
      if (cur > maxSum) maxSum = cur;
    }

    out.push(maxSum);
  }

  console.log(out.join('\n'));
}

solve();
