const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;

  const k = parseInt(raw, 10);
  if (k > 36) {
    console.log(-1);
    return;
  }

  const eights = Math.floor(k / 2);
  let res = '8'.repeat(eights);
  if (k % 2 === 1) {
    res = '4' + res;
  }

  console.log(res);
}

solve();
