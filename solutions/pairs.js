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
  const m = nextInt();

  const a = new Int32Array(m);
  const b = new Int32Array(m);
  for (let i = 0; i < m; i++) {
    a[i] = nextInt();
    b[i] = nextInt();
  }

  function check(x, y) {
    for (let i = 0; i < m; i++) {
      if (a[i] !== x && a[i] !== y && b[i] !== x && b[i] !== y) {
        return false;
      }
    }
    return true;
  }

  function testCandidate(x) {
    let firstMiss = -1;
    for (let i = 0; i < m; i++) {
      if (a[i] !== x && b[i] !== x) {
        firstMiss = i;
        break;
      }
    }
    if (firstMiss === -1) return true;
    if (check(x, a[firstMiss])) return true;
    if (check(x, b[firstMiss])) return true;
    return false;
  }

  if (testCandidate(a[0]) || testCandidate(b[0])) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();
