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
  const q = nextInt();
  if (q === null) return;
  const out = [];
  for (let qc = 0; qc < q; qc++) {
    const h = nextInt(), n = nextInt();
    const p = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) p[i] = nextInt();
    p[n] = 0;
    let crystals = 0;
    let i = 0;
    while (i < n - 1) {
      if (p[i + 1] === p[i] - 1) {
        if (p[i + 2] === p[i] - 2) {
          i += 2;
        } else {
          crystals++;
          p[i + 1] = p[i] - 2;
          i++;
        }
      } else {
        p[i] = p[i + 1] + 1;
      }
    }
    out.push(crystals);
  }
  console.log(out.join('\n'));
}
solve();