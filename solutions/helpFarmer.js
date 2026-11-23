const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = BigInt(input);
  const nNum = Number(n);
  const divs = [];
  for (let d = 1; d * d <= nNum; d++) {
    if (nNum % d === 0) {
      divs.push(BigInt(d));
      if (d * d !== nNum) divs.push(BigInt(nNum / d));
    }
  }
  divs.sort((a, b) => (a < b ? -1 : 1));
  let minStolen = -1n;
  let maxStolen = -1n;
  for (let i = 0; i < divs.length; i++) {
    const x = divs[i];
    const rem = n / x;
    const remNum = Number(rem);
    for (let j = 0; divs[j] * divs[j] <= rem; j++) {
      if (remNum % Number(divs[j]) === 0) {
        const y = divs[j];
        const z = rem / y;
        const c1 = (x + 1n) * (y + 2n) * (z + 2n) - n;
        const c2 = (x + 2n) * (y + 1n) * (z + 2n) - n;
        const c3 = (x + 2n) * (y + 2n) * (z + 1n) - n;
        for (const c of [c1, c2, c3]) {
          if (minStolen === -1n || c < minStolen) minStolen = c;
          if (maxStolen === -1n || c > maxStolen) maxStolen = c;
        }
      }
    }
  }
  console.log(minStolen.toString() + ' ' + maxStolen.toString());
}

solve();
