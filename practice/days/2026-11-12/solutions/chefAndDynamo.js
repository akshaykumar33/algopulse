const fs = require('fs');

function solve() {
  const rb = Buffer.alloc(1 << 16);
  let len = 0;
  let ptr = 0;

  const byte = () => {
    if (ptr === len) {
      len = 0;
      while (len === 0) {
        try {
          len = fs.readSync(0, rb, 0, rb.length, null);
        } catch (e) {
          if (e.code === 'EAGAIN') continue;
          if (e.code === 'EOF') return -1;
          throw e;
        }
        if (len === 0) return -1;
      }
      ptr = 0;
    }
    return rb[ptr++];
  };

  const nextBigInt = () => {
    let c = byte();
    while (c >= 0 && c <= 32) c = byte();
    if (c < 0) return null;
    let neg = false;
    if (c === 45) {
      neg = true;
      c = byte();
    }
    let x = 0n;
    while (c > 32) {
      x = x * 10n + BigInt(c - 48);
      c = byte();
    }
    return neg ? -x : x;
  };

  const out = (s) => {
    const buf = Buffer.from(s + '\n');
    let off = 0;
    while (off < buf.length) {
      try {
        off += fs.writeSync(1, buf, off, buf.length - off);
      } catch (e) {
        if (e.code === 'EAGAIN') continue;
        throw e;
      }
    }
  };

  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);

  for (let tc = 0; tc < t; tc++) {
    const nVal = nextBigInt();
    const a = nextBigInt();
    if (nVal === null || a === null) return;
    const p = 10n ** nVal;
    out((a + 2n * p).toString());
    const b = nextBigInt();
    if (b === null) return;
    out((p - b).toString());
    const d = nextBigInt();
    if (d === null) return;
    out((p - d).toString());
    const v = nextBigInt();
    if (v === null || v !== 1n) return;
  }
}

solve();
