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
  const T = nextInt();
  if (T === null) return;
  const MAX = 1000005;
  const freq = new Int32Array(MAX);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    let evens = 0, odds = 0;
    const a = new Int32Array(n);
    const unique = [];
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      a[i] = v;
      if (freq[v] === 0) unique.push(v);
      freq[v]++;
      if (v % 2 === 0) evens++;
      else odds++;
    }
    let totalPairs = (evens * (evens - 1) / 2) + (odds * (odds - 1) / 2);
    let equalPairs = 0;
    let xor2Pairs = 0;
    for (let i = 0; i < unique.length; i++) {
      const v = unique[i];
      const c = freq[v];
      equalPairs += c * (c - 1) / 2;
      const v2 = v ^ 2;
      if (v < v2 && v2 < MAX && freq[v2] > 0) {
        xor2Pairs += c * freq[v2];
      }
    }
    for (let i = 0; i < unique.length; i++) freq[unique[i]] = 0;
    out.push(totalPairs - equalPairs - xor2Pairs);
  }
  console.log(out.join('\n'));
}
solve();
