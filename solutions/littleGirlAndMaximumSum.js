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
  const q = nextInt();

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();

  const diff = new Int32Array(n + 2);
  for (let i = 0; i < q; i++) {
    const l = nextInt();
    const r = nextInt();
    diff[l]++;
    diff[r + 1]--;
  }

  const cnt = new Int32Array(n);
  let cur = 0;
  for (let i = 1; i <= n; i++) {
    cur += diff[i];
    cnt[i - 1] = cur;
  }

  a.sort();
  cnt.sort();

  let ans = 0n;
  for (let i = 0; i < n; i++) {
    ans += BigInt(a[i]) * BigInt(cnt[i]);
  }

  console.log(ans.toString());
}

solve();
