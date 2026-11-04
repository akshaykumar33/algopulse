const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const l = parseInt(input[0], 10);
  const r = parseInt(input[1], 10);

  const list = [];
  const MAX = 2000000000;

  let p2 = 1;
  while (p2 <= MAX) {
    let p3 = p2;
    while (p3 <= MAX) {
      list.push(p3);
      if (p3 > Math.floor(MAX / 3)) break;
      p3 *= 3;
    }
    if (p2 > Math.floor(MAX / 2)) break;
    p2 *= 2;
  }

  let ans = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] >= l && list[i] <= r) {
      ans++;
    }
  }

  console.log(ans);
}

solve();
