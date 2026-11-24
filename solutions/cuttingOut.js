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
  const n = nextInt();
  if (n === null) return;
  const k = nextInt();
  const freq = new Map();
  for (let i = 0; i < n; i++) {
    const v = nextInt();
    freq.set(v, (freq.get(v) || 0) + 1);
  }
  const entries = Array.from(freq.entries());
  let low = 1;
  let high = n;
  let bestC = 1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    let cnt = 0;
    for (let i = 0; i < entries.length; i++) {
      cnt += Math.floor(entries[i][1] / mid);
      if (cnt >= k) break;
    }
    if (cnt >= k) {
      bestC = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  const ans = [];
  for (let i = 0; i < entries.length; i++) {
    const take = Math.floor(entries[i][1] / bestC);
    for (let j = 0; j < take && ans.length < k; j++) {
      ans.push(entries[i][0]);
    }
    if (ans.length >= k) break;
  }
  console.log(ans.join(' '));
}

solve();
