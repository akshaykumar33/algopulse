const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);

  let lineIdx = 0;
  const [n, x, y] = input[lineIdx++].split(' ').map(Number);
  const a = input[lineIdx++].split(' ').map(Number);

  if (x > y) {
    console.log(n);
    return;
  }

  let brokenDoors = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] <= x) {
      brokenDoors++;
    }
  }

  console.log(Math.ceil(brokenDoors / 2));
}

solve();
