const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const a = new Int32Array(n);
    let maxVal = k;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      if (a[i] > maxVal) maxVal = a[i];
    }

    const freq = new Int32Array(maxVal + 1);
    let mx = 0;
    for (let i = 0; i < n; i++) {
      freq[a[i]]++;
      if (freq[a[i]] > mx) mx = freq[a[i]];
    }

    if (freq[k] === mx) {
      out.push(0);
      continue;
    }

    let found = false;
    freq.fill(0);
    mx = 0;
    for (let i = 0; i < n - 1; i++) {
      freq[a[i]]++;
      if (freq[a[i]] > mx) mx = freq[a[i]];
      if (freq[k] === mx) {
        found = true;
        break;
      }
    }

    if (found) {
      out.push(1);
      continue;
    }

    freq.fill(0);
    mx = 0;
    for (let i = n - 1; i > 0; i--) {
      freq[a[i]]++;
      if (freq[a[i]] > mx) mx = freq[a[i]];
      if (freq[k] === mx) {
        found = true;
        break;
      }
    }

    if (found) {
      out.push(1);
    } else {
      out.push(2);
    }
  }

  console.log(out.join('\n'));
}

solve();
