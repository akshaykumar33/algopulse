const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1n;
    if (buf[pos] === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return sign * res;
  }

  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = nextBigInt();
    const b = nextBigInt();
    const c = nextBigInt();
    if (a === null) break;

    const mod1 = (a - b) % 2n;
    const mod2 = (b - c) % 2n;
    if (mod1 !== 0n || mod2 !== 0n) {
      out.push('-1');
      continue;
    }

    const d_cb = (c - b) / 2n;
    const d_ca = (c - a) / 2n;
    const d_bc = (b - c) / 2n;
    const d_ac = (a - c) / 2n;

    let k1 = 0n;
    if (d_cb > k1) k1 = d_cb;
    if (d_ca > k1) k1 = d_ca;

    const k2 = k1 + d_bc;
    const k3 = k1 + d_ac;

    out.push((k1 + k2 + k3).toString());
  }

  console.log(out.join('\n'));
}

solve();
