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

  const n = nextBigInt();
  if (n === null) return;

  const a = [];
  for (let i = 0n; i < n; i++) {
    a.push(nextBigInt());
  }

  a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

  let ans = 0n;
  for (let i = 0; i < a.length; i++) {
    ans += a[i] > 1n ? a[i] - 1n : 1n - a[i];
  }

  let c = 2n;
  while (true) {
    let curCost = 0n;
    let power = 1n;
    let overflow = false;

    for (let i = 0; i < a.length; i++) {
      if (power > ans + a[a.length - 1]) {
        overflow = true;
        break;
      }
      const diff = a[i] > power ? a[i] - power : power - a[i];
      curCost += diff;
      if (curCost > ans) {
        overflow = true;
        break;
      }
      if (i < a.length - 1) {
        power *= c;
      }
    }

    if (overflow && power > ans + a[a.length - 1]) {
      break;
    }

    if (!overflow && curCost < ans) {
      ans = curCost;
    }

    c++;
  }

  console.log(ans.toString());
}

solve();

