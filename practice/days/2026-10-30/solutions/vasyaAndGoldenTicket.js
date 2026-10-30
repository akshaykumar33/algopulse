const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const str = tokens[ptr++];
  const digits = [];
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    const d = parseInt(str[i], 10);
    digits.push(d);
    totalSum += d;
  }

  if (totalSum === 0) {
    console.log(n >= 2 ? 'YES' : 'NO');
    return;
  }

  let possible = false;
  for (let target = 0; target < totalSum; target++) {
    let cur = 0;
    let segments = 0;
    let ok = true;

    for (let i = 0; i < n; i++) {
      cur += digits[i];
      if (cur === target) {
        segments++;
        cur = 0;
      } else if (cur > target) {
        ok = false;
        break;
      }
    }

    if (ok && cur === 0 && segments >= 2) {
      possible = true;
      break;
    }
  }

  console.log(possible ? 'YES' : 'NO');
}

solve();
