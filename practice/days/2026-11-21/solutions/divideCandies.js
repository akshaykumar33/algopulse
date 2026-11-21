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
  const m = nextInt();
  const cnt = new Float64Array(m);
  const q = Math.floor(n / m);
  const r = n % m;
  for (let i = 0; i < m; i++) {
    cnt[i] = q;
  }
  for (let i = 1; i <= r; i++) {
    cnt[i % m]++;
  }
  let ans = 0n;
  for (let i = 0; i < m; i++) {
    const i2 = (i * i) % m;
    for (let j = 0; j < m; j++) {
      if ((i2 + (j * j) % m) % m === 0) {
        ans += BigInt(cnt[i]) * BigInt(cnt[j]);
      }
    }
  }
  console.log(ans.toString());
}
solve();