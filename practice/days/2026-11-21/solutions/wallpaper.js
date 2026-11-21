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
  const rooms = [];
  for (let i = 0; i < n; i++) {
    const l = nextInt(), w = nextInt(), h = nextInt();
    rooms.push({ l, w, h });
  }
  const m = nextInt();
  const rolls = [];
  for (let i = 0; i < m; i++) {
    const lr = nextInt(), wr = nextInt(), cr = nextInt();
    rolls.push({ lr, wr, cr });
  }
  let totalCost = 0;
  for (const r of rooms) {
    let best = Infinity;
    const perimeter = 2 * (r.l + r.w);
    for (const roll of rolls) {
      if (roll.lr < r.h) continue;
      const stripsPerRoll = Math.floor(roll.lr / r.h);
      if (stripsPerRoll === 0) continue;
      const totalStripsNeeded = Math.ceil(perimeter / roll.wr);
      const rollsNeeded = Math.ceil(totalStripsNeeded / stripsPerRoll);
      const cost = rollsNeeded * roll.cr;
      if (cost < best) best = cost;
    }
    totalCost += best;
  }
  console.log(totalCost);
}
solve();