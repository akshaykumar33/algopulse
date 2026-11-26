const fs = require('fs');

function floorSum(n, m, a, b) {
  let ans = 0n;
  while (true) {
    if (a >= m) {
      ans += ((n - 1n) * n / 2n) * (a / m);
      a %= m;
    }
    if (b >= m) {
      ans += n * (b / m);
      b %= m;
    }
    let yMax = (a * (n - 1n) + b) / m;
    if (yMax === 0n) break;
    let xMax = yMax * m - b;
    ans += (n - (xMax + a - 1n) / a) * yMax;
    n = yMax;
    let tempA = m;
    let tempB = (a - (xMax % a)) % a;
    m = a;
    a = tempA;
    b = tempB;
  }
  return ans;
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const out = [];

  while (true) {
    const n = nextBigInt();
    if (n === null) break;
    const m = nextBigInt();
    const x = nextBigInt();
    if (n === 0n && m === 0n && x === 0n) break;

    const ans = floorSum(m, m, n, x);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
