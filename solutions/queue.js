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

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();

  const minSuf = new Int32Array(n);
  minSuf[n - 1] = a[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    minSuf[i] = a[i] < minSuf[i + 1] ? a[i] : minSuf[i + 1];
  }

  const ans = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    if (i === n - 1 || minSuf[i + 1] >= a[i]) {
      ans[i] = -1;
      continue;
    }

    let low = i + 1, high = n - 1, best = i + 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (minSuf[mid] < a[i]) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    ans[i] = best - i - 1;
  }

  console.log(ans.join(' '));
}

solve();
