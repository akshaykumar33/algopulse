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
  const x = nextInt();
  const a = new Int32Array(n + 1);
  const nextNode = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = nextInt();
    if (a[i] !== 0) {
      nextNode[a[i]] = i;
    }
  }
  let distX = 0;
  const otherLens = [];
  for (let i = 1; i <= n; i++) {
    if (a[i] === 0) {
      let cur = i;
      let len = 0;
      let hasX = false;
      let curDist = 0;
      while (cur !== 0) {
        len++;
        if (cur === x) {
          hasX = true;
          curDist = len;
        }
        cur = nextNode[cur];
      }
      if (hasX) {
        distX = curDist;
      } else {
        otherLens.push(len);
      }
    }
  }
  const dp = new Uint8Array(n + 1);
  dp[0] = 1;
  for (const len of otherLens) {
    for (let s = n; s >= len; s--) {
      if (dp[s - len]) dp[s] = 1;
    }
  }
  const res = [];
  for (let s = 0; s <= n; s++) {
    if (dp[s]) res.push(s + distX);
  }
  console.log(res.join('\n'));
}

solve();
