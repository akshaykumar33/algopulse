const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  let arr = new Int32Array(300005);
  let pref = new Int32Array(300005);
  let suf = new Int32Array(300005);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n > arr.length) {
      arr = new Int32Array(n);
      pref = new Int32Array(n);
      suf = new Int32Array(n);
    }

    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    if (n === 1) {
      out.push(1);
      continue;
    }

    pref[0] = arr[0];
    for (let i = 1; i < n; i++) {
      pref[i] = pref[i - 1] === 1 ? 1 : gcd(pref[i - 1], arr[i]);
    }

    suf[n - 1] = arr[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      suf[i] = suf[i + 1] === 1 ? 1 : gcd(suf[i + 1], arr[i]);
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
      let g;
      if (i === 0) {
        g = suf[1];
      } else if (i === n - 1) {
        g = pref[n - 2];
      } else {
        g = pref[i - 1] === 1 || suf[i + 1] === 1 ? 1 : gcd(pref[i - 1], suf[i + 1]);
      }
      if (g > 1) ans++;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
