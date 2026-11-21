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
  const q = nextInt();
  const compR = new Int32Array(n + 1);
  let curR = 0;
  let prevR = -1;
  for (let i = 1; i <= n; i++) {
    const val = nextInt() & 1;
    if (val !== prevR) {
      curR++;
      prevR = val;
    }
    compR[i] = curR;
  }
  const compC = new Int32Array(n + 1);
  let curC = 0;
  let prevC = -1;
  for (let i = 1; i <= n; i++) {
    const val = nextInt() & 1;
    if (val !== prevC) {
      curC++;
      prevC = val;
    }
    compC[i] = curC;
  }
  const out = [];
  for (let i = 0; i < q; i++) {
    const ra = nextInt(), ca = nextInt(), rb = nextInt(), cb = nextInt();
    if (compR[ra] === compR[rb] && compC[ca] === compC[cb]) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}
solve();