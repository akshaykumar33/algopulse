const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const n = nextInt();
  if (n === null) return;
  const val = new Int32Array(n + 5);
  const add = new Float64Array(n + 5);
  let len = 1;
  let sum = 0;
  val[0] = 0;
  const out = [];
  for (let i = 0; i < n; i++) {
    const type = nextInt();
    if (type === 1) {
      const a = nextInt();
      const x = nextInt();
      add[a - 1] += x;
      sum += a * x;
    } else if (type === 2) {
      const k = nextInt();
      val[len] = k;
      add[len] = 0;
      len++;
      sum += k;
    } else if (type === 3) {
      len--;
      const v = val[len] + add[len];
      if (len > 0) add[len - 1] += add[len];
      add[len] = 0;
      sum -= v;
    }
    out.push((sum / len).toFixed(6));
  }
  console.log(out.join('\n'));
}

solve();
