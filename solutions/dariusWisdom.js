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
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n + 1);
    const pos0 = [];
    const pos1 = [];
    const pos2 = [];
    for (let i = 1; i <= n; i++) {
      a[i] = nextInt();
      if (a[i] === 0) pos0.push(i);
      else if (a[i] === 1) pos1.push(i);
      else pos2.push(i);
    }
    const c0 = pos0.length;
    const c1 = pos1.length;
    const ops = [];
    const set1 = new Set(pos1);
    const set2 = new Set(pos2);
    const set0 = new Set(pos0);

    let p0 = 0;
    let p1 = 0;
    for (let i = 1; i <= c0; i++) {
      if (a[i] === 0) continue;
      if (a[i] === 1) {
        while (pos0[pos0.length - 1] <= c0) pos0.pop();
        const j = pos0.pop();
        ops.push([i, j]);
        a[i] = 0;
        a[j] = 1;
        set1.delete(i);
        set1.add(j);
      } else if (a[i] === 2) {
        let k = -1;
        for (const idx of set1) {
          k = idx;
          break;
        }
        ops.push([i, k]);
        a[i] = 1;
        a[k] = 2;
        set1.delete(k);
        set1.add(i);
        while (pos0[pos0.length - 1] <= c0) pos0.pop();
        const j = pos0.pop();
        ops.push([i, j]);
        a[i] = 0;
        a[j] = 1;
        set1.delete(i);
        set1.add(j);
      }
    }
    for (let i = c0 + 1; i <= c0 + c1; i++) {
      if (a[i] === 1) continue;
      if (a[i] === 2) {
        let j = -1;
        for (const idx of set1) {
          if (idx > c0 + c1) {
            j = idx;
            break;
          }
        }
        ops.push([i, j]);
        a[i] = 1;
        a[j] = 2;
        set1.delete(j);
        set1.add(i);
      }
    }
    out.push(ops.length);
    for (let i = 0; i < ops.length; i++) {
      out.push(ops[i][0] + ' ' + ops[i][1]);
    }
  }
  console.log(out.join('\n'));
}

solve();
