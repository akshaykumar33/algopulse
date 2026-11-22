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
  const m = nextInt(), k = nextInt();
  const req = [];
  for (let i = 0; i < n; i++) {
    const row = new Int32Array(m);
    for (let j = 0; j < m; j++) row[j] = nextInt();
    req.push(row);
  }
  const failTime = new Int32Array(n);
  const failed = new Uint8Array(n);
  const locked = new Uint8Array(k + 1);
  for (let t = 0; t < m; t++) {
    const cellReqs = new Map();
    for (let i = 0; i < n; i++) {
      if (failed[i]) continue;
      const mem = req[i][t];
      if (mem > 0) {
        if (!cellReqs.has(mem)) cellReqs.set(mem, []);
        cellReqs.get(mem).push(i);
      }
    }
    for (const [mem, cores] of cellReqs.entries()) {
      if (locked[mem]) {
        for (const c of cores) {
          failed[c] = 1;
          failTime[c] = t + 1;
        }
      } else if (cores.length > 1) {
        locked[mem] = 1;
        for (const c of cores) {
          failed[c] = 1;
          failTime[c] = t + 1;
        }
      }
    }
  }
  const out = [];
  for (let i = 0; i < n; i++) out.push(failTime[i]);
  console.log(out.join('\n'));
}
solve();
