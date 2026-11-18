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
  const m = nextInt();
  const c = nextInt();

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();

  const prefB = new Float64Array(m + 1);
  for (let i = 0; i < m; i++) {
    prefB[i + 1] = prefB[i] + nextInt();
  }

  const span = n - m;
  const ans = new Int32Array(n);

  for (let k = 0; k < n; k++) {
    const l = k - span > 0 ? k - span : 0;
    const r = k < m - 1 ? k : m - 1;
    const sum = prefB[r + 1] - prefB[l];
    ans[k] = (a[k] + (sum % c)) % c;
  }

  console.log(ans.join(' '));
}

solve();
