const fs = require('fs');
const rb = Buffer.alloc(1 << 12);
let len = 0;
let ptr = 0;

function byte() {
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
}

function nextInt() {
  let c = byte();
  while (c !== -1 && c <= 32) c = byte();
  if (c === -1) process.exit(0);
  let neg = false;
  if (c === 45) {
    neg = true;
    c = byte();
  }
  let x = 0;
  while (c > 32) {
    x = x * 10 + c - 48;
    c = byte();
  }
  return neg ? -x : x;
}

function out(s) {
  fs.writeSync(1, s + '\n');
}

function pickStep(sz, c) {
  let bestCost = sz - 1 + c;
  let bestB = 1;
  for (let b = 2; b <= 20; b++) {
    const k = Math.ceil(Math.pow(sz, 1 / b));
    const cost = b * (k - 1 + c);
    if (cost < bestCost) {
      bestCost = cost;
      bestB = b;
    }
  }
  if (bestB === 1) return 1;
  const k = Math.ceil(Math.pow(sz, 1 / bestB));
  return Math.max(1, Math.ceil(sz / k));
}

function solve() {
  const n = nextInt();
  const c = nextInt();
  let lo = 1;
  let hi = n;
  while (lo < hi) {
    const step = pickStep(hi - lo + 1, c);
    let y = lo + step - 1;
    while (y < hi) {
      out(`1 ${y}`);
      const res = nextInt();
      if (res === -1) process.exit(0);
      if (res === 1) {
        out('2');
        hi = y;
        break;
      }
      lo = y + 1;
      y += step;
    }
  }
  out(`3 ${lo}`);
}

solve();
