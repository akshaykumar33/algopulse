const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1n;
    if (buf[pos] === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return sign * res;
  }

  const nVal = nextInt();
  if (nVal === null) return;
  const n = Number(nVal);
  const p = nextInt();
  const q = nextInt();
  const r = nextInt();

  const firstA = nextInt();
  let dp1 = p * firstA;
  let dp2 = dp1 + q * firstA;
  let dp3 = dp2 + r * firstA;

  for (let i = 1; i < n; i++) {
    const a = nextInt();
    const cand1 = p * a;
    if (cand1 > dp1) dp1 = cand1;

    const cand2 = dp1 + q * a;
    if (cand2 > dp2) dp2 = cand2;

    const cand3 = dp2 + r * a;
    if (cand3 > dp3) dp3 = cand3;
  }

  console.log(dp3.toString());
}

solve();
