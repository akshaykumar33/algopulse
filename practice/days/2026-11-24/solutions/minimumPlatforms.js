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
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const at = new Int32Array(n);
    for (let i = 0; i < n; i++) at[i] = nextInt();
    const dt = new Int32Array(n);
    for (let i = 0; i < n; i++) dt[i] = nextInt();
    at.sort();
    dt.sort();
    let plat = 0;
    let maxPlat = 0;
    let i = 0;
    let j = 0;
    while (i < n && j < n) {
      if (at[i] <= dt[j]) {
        plat++;
        if (plat > maxPlat) maxPlat = plat;
        i++;
      } else {
        plat--;
        j++;
      }
    }
    out.push(maxPlat);
  }
  console.log(out.join('\n'));
}

solve();
