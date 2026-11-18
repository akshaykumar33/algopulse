const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = nextInt();
    const m = nextInt();

    let ops = 1n;
    let cur = 1n;
    while (cur < x) {
      cur <<= 1n;
      ops++;
    }

    if (m < ops) {
      out.push(0);
    } else {
      const ans = 1n + (m - ops);
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
