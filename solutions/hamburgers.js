const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const recipe = input[0];
  let cB = 0n, cS = 0n, cC = 0n;
  for (let i = 0; i < recipe.length; i++) {
    if (recipe[i] === 'B') cB++;
    else if (recipe[i] === 'S') cS++;
    else if (recipe[i] === 'C') cC++;
  }
  const nb = BigInt(input[1]), ns = BigInt(input[2]), nc = BigInt(input[3]);
  const pb = BigInt(input[4]), ps = BigInt(input[5]), pc = BigInt(input[6]);
  const r = BigInt(input[7]);
  function cost(X) {
    const needB = X * cB > nb ? (X * cB - nb) * pb : 0n;
    const needS = X * cS > ns ? (X * cS - ns) * ps : 0n;
    const needC = X * cC > nc ? (X * cC - nc) * pc : 0n;
    return needB + needS + needC;
  }
  let lo = 0n, hi = 10000000000000n, ans = 0n;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1n;
    if (cost(mid) <= r) {
      ans = mid;
      lo = mid + 1n;
    } else {
      hi = mid - 1n;
    }
  }
  console.log(ans.toString());
}
solve();