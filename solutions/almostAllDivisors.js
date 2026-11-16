const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
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
    if (n === null) break;
    const d = new Float64Array(n);
    for (let i = 0; i < n; i++) d[i] = nextInt();
    d.sort();

    const x = d[0] * d[n - 1];
    let ok = true;
    for (let i = 0; i < n; i++) {
      if (d[i] * d[n - 1 - i] !== x) {
        ok = false;
        break;
      }
    }

    if (!ok) {
      out.push('-1');
      continue;
    }

    let countDiv = 0;
    const limit = Math.floor(Math.sqrt(x));
    for (let i = 2; i <= limit; i++) {
      if (x % i === 0) {
        countDiv++;
        if (i * i !== x) countDiv++;
        if (countDiv > n) {
          ok = false;
          break;
        }
      }
    }

    if (ok && countDiv === n) {
      out.push(x.toFixed(0));
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();
