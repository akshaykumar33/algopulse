const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 43) { sign = 1; pos++; }
    else if (buf[pos] === 45) { sign = -1; pos++; }
    let val = 0;
    while (pos < buf.length && buf[pos] > 32) {
      val = val * 10 + (buf[pos] - 48);
      pos++;
    }
    return sign * val;
  }
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
  const st = new Int32Array(n + 1);
  const plus = new Int32Array(n + 1);
  const minus = new Int32Array(n + 1);
  let totalMinus = 0;
  for (let i = 1; i <= n; i++) {
    const val = nextToken();
    st[i] = val;
    if (val > 0) {
      plus[val]++;
    } else {
      minus[-val]++;
      totalMinus++;
    }
  }
  const canBe = new Uint8Array(n + 1);
  let candidates = 0;
  for (let i = 1; i <= n; i++) {
    const truthCount = plus[i] + (totalMinus - minus[i]);
    if (truthCount === m) {
      canBe[i] = 1;
      candidates++;
    }
  }
  const out = [];
  for (let i = 1; i <= n; i++) {
    const s = st[i];
    if (s > 0) {
      if (canBe[s]) {
        out.push(candidates === 1 ? 'Truth' : 'Not defined');
      } else {
        out.push('Lie');
      }
    } else {
      const target = -s;
      if (canBe[target]) {
        out.push(candidates === 1 ? 'Lie' : 'Not defined');
      } else {
        out.push('Truth');
      }
    }
  }
  console.log(out.join('\n'));
}
solve();