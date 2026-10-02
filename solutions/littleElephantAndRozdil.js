const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (lines.length < 2) return;
  const n = parseInt(lines[0], 10);
  const arr = lines[1].split(/\s+/).map(Number);

  let minVal = Infinity;
  let minIdx = -1;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (arr[i] < minVal) {
      minVal = arr[i];
      minIdx = i + 1;
      count = 1;
    } else if (arr[i] === minVal) {
      count++;
    }
  }

  if (count > 1) {
    console.log("Still Rozdil");
  } else {
    console.log(minIdx);
  }
}

solve();
