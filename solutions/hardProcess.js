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

  const nVal = nextInt();
  if (nVal === null) return;
  const n = nVal;
  const k = nextInt();

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();

  let left = 0;
  let zeros = 0;
  let maxLen = 0;
  let bestL = 0, bestR = -1;

  for (let right = 0; right < n; right++) {
    if (a[right] === 0) zeros++;
    while (zeros > k) {
      if (a[left] === 0) zeros--;
      left++;
    }
    const len = right - left + 1;
    if (len > maxLen) {
      maxLen = len;
      bestL = left;
      bestR = right;
    }
  }

  for (let i = bestL; i <= bestR; i++) a[i] = 1;

  console.log(maxLen);
  console.log(a.join(' '));
}

solve();
