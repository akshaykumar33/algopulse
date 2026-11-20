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
  const T = tVal;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = nextInt();
    const m = nextInt();
    const k = nextInt();

    const xs = new Int32Array(k);
    const ys = new Int32Array(k);
    const order = new Int32Array(k);

    for (let i = 0; i < k; i++) {
      xs[i] = nextInt();
      ys[i] = nextInt();
      order[i] = i;
    }

    order.sort((i, j) => {
      const xi = xs[i], xj = xs[j];
      if (xi !== xj) return xi - xj;
      return ys[i] - ys[j];
    });

    const tails = new Int32Array(k);
    let len = 0;

    for (let i = 0; i < k; i++) {
      const idx = order[i];
      const y = ys[idx];
      let lo = 0, hi = len;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (tails[mid] <= y) lo = mid + 1;
        else hi = mid;
      }
      tails[lo] = y;
      if (lo === len) len++;
    }

    const base = BigInt(n) + BigInt(m) - 1n;
    const ans = base + BigInt(len);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
