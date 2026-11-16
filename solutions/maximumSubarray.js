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
    return sign * res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    const m = nextInt();
    let posSumB = 0;
    for (let i = 0; i < m; i++) {
      const val = nextInt();
      if (val > 0) posSumB += val;
    }

    let kadane = a[0];
    let curr = a[0];
    for (let i = 1; i < n; i++) {
      curr = Math.max(a[i], curr + a[i]);
      kadane = Math.max(kadane, curr);
    }

    let maxPref = 0;
    let pref = 0;
    for (let i = 0; i < n; i++) {
      pref += a[i];
      if (pref > maxPref) maxPref = pref;
    }

    let maxSuff = 0;
    let suff = 0;
    for (let i = n - 1; i >= 0; i--) {
      suff += a[i];
      if (suff > maxSuff) maxSuff = suff;
    }

    let ans = Math.max(kadane, maxPref + posSumB, maxSuff + posSumB);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
