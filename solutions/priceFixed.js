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
  const n = nextInt();
  if (n === null) return;
  const items = [];
  for (let i = 0; i < n; i++) {
    const a = nextInt(), b = nextInt();
    items.push({ a: BigInt(a), b: BigInt(b) });
  }
  items.sort((x, y) => (x.b < y.b ? -1 : x.b > y.b ? 1 : 0));
  let l = 0, r = n - 1;
  let bought = 0n;
  let cost = 0n;
  while (l <= r) {
    if (bought >= items[l].b) {
      cost += items[l].a;
      bought += items[l].a;
      l++;
    } else {
      const needed = items[l].b - bought;
      const take = needed < items[r].a ? needed : items[r].a;
      cost += take * 2n;
      bought += take;
      items[r].a -= take;
      if (items[r].a === 0n) r--;
    }
  }
  console.log(cost.toString());
}
solve();