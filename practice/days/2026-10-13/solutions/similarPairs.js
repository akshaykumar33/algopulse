const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(lines[lineIdx++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].split(' ').map(Number);
    
    arr.sort((a, b) => a - b);
    
    let evens = 0;
    let odds = 0;
    for (let j = 0; j < n; j++) {
      if (arr[j] % 2 === 0) {
        evens++;
      } else {
        odds++;
      }
    }

    if (evens % 2 === 0 && odds % 2 === 0) {
      out.push("YES");
    } else {
      let adjacentFound = false;
      for (let j = 0; j < n - 1; j++) {
        if (arr[j + 1] - arr[j] === 1) {
          adjacentFound = true;
          break;
        }
      }
      if (adjacentFound) {
        out.push("YES");
      } else {
        out.push("NO");
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
