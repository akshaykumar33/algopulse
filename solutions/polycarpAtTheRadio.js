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
  const a = new Int32Array(n);
  const cnt = new Int32Array(m + 1);
  for (let i = 0; i < n; i++) {
    a[i] = nextInt();
    if (a[i] <= m) cnt[a[i]]++;
  }
  const target = Math.floor(n / m);
  let changes = 0;
  let deficit = 1;
  function getDeficit() {
    while (deficit <= m && cnt[deficit] >= target) deficit++;
    return deficit <= m ? deficit : -1;
  }
  for (let i = 0; i < n; i++) {
    const d = getDeficit();
    if (d === -1) break;
    if (a[i] > m) {
      a[i] = d;
      cnt[d]++;
      changes++;
    }
  }
  for (let i = 0; i < n; i++) {
    const d = getDeficit();
    if (d === -1) break;
    if (a[i] <= m && cnt[a[i]] > target) {
      cnt[a[i]]--;
      a[i] = d;
      cnt[d]++;
      changes++;
    }
  }
  console.log(target + ' ' + changes);
  console.log(a.join(' '));
}
solve();