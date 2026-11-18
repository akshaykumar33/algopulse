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
    const d = nextInt();
    const a = new Int32Array(n);
    let sum = 0n;

    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      sum += BigInt(a[i]);
    }

    if (sum % BigInt(n) !== 0n) {
      out.push(-1);
      continue;
    }

    const target = sum / BigInt(n);
    let totalMoves = 0n;
    let ok = true;

    for (let r = 0; r < d; r++) {
      let bal = 0n;
      for (let i = r; i < n; i += d) {
        bal += BigInt(a[i]) - target;
        totalMoves += bal < 0n ? -bal : bal;
      }
      if (bal !== 0n) {
        ok = false;
        break;
      }
    }

    if (!ok) {
      out.push(-1);
    } else {
      out.push(totalMoves.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
