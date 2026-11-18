const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }

  const nVal = nextInt();
  if (nVal === null) return;
  const n = nVal;

  const neg = [];
  for (let i = 0; i < n; i++) {
    const val = nextInt();
    if (val < 0) neg.push(val);
  }

  const x = nextInt();

  neg.sort((a, b) => a - b);

  if (neg.length === 0) {
    console.log('0');
    return;
  }

  if (neg.length <= x) {
    let sum = 0n;
    for (let i = 0; i < neg.length; i++) {
      sum += BigInt(-neg[i]);
    }
    console.log(sum.toString());
    return;
  }

  const c = BigInt(-neg[x - 1]);
  let cost = c * BigInt(x);
  for (let i = 0; i < x - 1; i++) {
    cost += BigInt(-neg[i]) - c;
  }

  console.log(cost.toString());
}

solve();
