const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  const freq = new Int32Array(200005);

  function doMAD(arr, n) {
    let curMAD = 0;
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const v = arr[i];
      freq[v]++;
      if (freq[v] >= 2 && v > curMAD) {
        curMAD = v;
      }
      b[i] = curMAD;
    }
    for (let i = 0; i < n; i++) {
      freq[arr[i]] = 0;
    }
    return b;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let a = new Int32Array(n);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      sum += BigInt(a[i]);
    }

    a = doMAD(a, n);
    for (let i = 0; i < n; i++) {
      sum += BigInt(a[i]);
    }

    a = doMAD(a, n);
    for (let i = 0; i < n; i++) {
      sum += BigInt(a[i]) * BigInt(n - i);
    }

    out.push(sum.toString());
  }

  console.log(out.join('\n'));
}

solve();
