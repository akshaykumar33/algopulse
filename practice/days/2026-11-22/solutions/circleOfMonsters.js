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
    const n = nextInt();
    const a = new Float64Array(n);
    const b = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      b[i] = nextInt();
    }
    let totalDirect = 0n;
    let minAdd = Infinity;
    for (let i = 0; i < n; i++) {
      const prevB = b[(i - 1 + n) % n];
      const direct = Math.max(0, a[i] - prevB);
      totalDirect += BigInt(Math.floor(direct));
      const add = Math.min(a[i], prevB);
      if (add < minAdd) minAdd = add;
    }
    const ans = totalDirect + BigInt(Math.floor(minAdd));
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();