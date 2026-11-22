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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt(), m = nextInt();
    const posA_r = new Int32Array(n * m + 1);
    const posA_c = new Int32Array(n * m + 1);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        const v = nextInt();
        posA_r[v] = r;
        posA_c[v] = c;
      }
    }
    const b = [];
    for (let r = 0; r < n; r++) {
      const row = new Int32Array(m);
      for (let c = 0; c < m; c++) {
        row[c] = nextInt();
      }
      b.push(row);
    }
    let ok = true;
    for (let r = 0; r < n; r++) {
      const expectedRow = posA_r[b[r][0]];
      for (let c = 1; c < m; c++) {
        if (posA_r[b[r][c]] !== expectedRow) {
          ok = false;
          break;
        }
      }
      if (!ok) break;
    }
    if (ok) {
      for (let c = 0; c < m; c++) {
        const expectedCol = posA_c[b[0][c]];
        for (let r = 1; r < n; r++) {
          if (posA_c[b[r][c]] !== expectedCol) {
            ok = false;
            break;
          }
        }
        if (!ok) break;
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();