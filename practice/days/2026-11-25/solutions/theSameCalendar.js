const fs = require('fs');

function isLeap(y) {
  return y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0);
}

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;
  const y = parseInt(s, 10);
  const targetLeap = isLeap(y);
  let shift = 0;
  let cur = y;
  while (true) {
    shift = (shift + (isLeap(cur) ? 366 : 365)) % 7;
    cur++;
    if (shift === 0 && isLeap(cur) === targetLeap) {
      console.log(cur);
      return;
    }
  }
}

solve();
