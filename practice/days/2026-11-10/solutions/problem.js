const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = parseInt(input[2], 10);
  const a = parseInt(input[3], 10);
  const b = parseInt(input[4], 10);

  if (a === b) {
    console.log(0);
    return;
  }

  const floorsPerEntrance = m * k;

  const ea = Math.floor((a - 1) / floorsPerEntrance) + 1;
  const fa = Math.floor(((a - 1) % floorsPerEntrance) / k) + 1;

  const eb = Math.floor((b - 1) / floorsPerEntrance) + 1;
  const fb = Math.floor(((b - 1) % floorsPerEntrance) / k) + 1;

  let ans = Infinity;

  if (ea === eb) {
    const walkCost = Math.abs(fa - fb) * 5;
    const elevCost = 10 + Math.abs(fa - fb);
    ans = Math.min(ans, walkCost, elevCost);
  } else {
    const costA_to_E1 = Math.min(
      (fa - 1) * 5,
      10 + (fa - 1)
    );

    const costB_from_E1 = Math.min(
      (fb - 1) * 5,
      10 + (fb - 1)
    );

    const diffE = Math.abs(ea - eb);
    const entranceMoveCost = Math.min(diffE, n - diffE) * 15;

    ans = Math.min(ans, costA_to_E1 + entranceMoveCost + costB_from_E1);
  }
  console.log(ans);
}

solve();
