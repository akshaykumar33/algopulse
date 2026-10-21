const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (lines.length < 4) return;
  const arr = lines.slice(0, 4).map(Number);
  arr.sort((a, b) => a - b);
  if (arr[0] * arr[3] === arr[1] * arr[2]) {
    console.log("Possible");
  } else {
    console.log("Impossible");
  }
}

solve();
