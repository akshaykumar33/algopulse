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
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return sign * res;
  }
  const n = nextInt();
  if (n === null) return;
  let low = -Infinity;
  let high = Infinity;
  let delta = 0;
  for (let i = 0; i < n; i++) {
    const c = nextInt();
    const d = nextInt();
    if (d === 1) {
      low = Math.max(low, 1900 - delta);
    } else {
      high = Math.min(high, 1899 - delta);
    }
    delta += c;
  }
  if (low > high) {
    console.log('Impossible');
  } else if (high === Infinity) {
    console.log('Infinity');
  } else {
    console.log(high + delta);
  }
}
solve();