const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextBigInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0n;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10n + BigInt(input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextBigInt();
  if (t === null) return;
  const out = [];

  function calc(len, k) {
    if (len < k) {
      return { count: 0n, sum: 0n };
    }

    if (len % 2n === 0n) {
      const half = len / 2n;
      const sub = calc(half, k);
      const count = 2n * sub.count;
      const sum = 2n * sub.sum + half * sub.count;
      return { count, sum };
    } else {
      const half = (len - 1n) / 2n;
      const m = (len + 1n) / 2n;
      const sub = calc(half, k);
      const count = 1n + 2n * sub.count;
      const sum = m * (1n + sub.count) + 2n * sub.sum;
      return { count, sum };
    }
  }

  for (let tc = 0n; tc < t; tc++) {
    const n = nextBigInt();
    const k = nextBigInt();
    const res = calc(n, k);
    out.push(res.sum.toString());
  }

  console.log(out.join('\n'));
}

solve();

