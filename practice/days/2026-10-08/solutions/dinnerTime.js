const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let line = 0;
  const t = parseInt(input[line++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[line++], 10);
    const arr = input[line++].split(' ').map(Number);

    let foundNonNegative = false;
    for (let j = 0; j < n; j++) {
      if (arr[j] >= 0) {
        foundNonNegative = true;
        break;
      }
    }

    if (foundNonNegative) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
