const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;

  let lineIdx = 0;
  let t = parseInt(lines[lineIdx++], 10);
  const out = [];

  while (t-- > 0) {
    if (lineIdx >= lines.length) break;
    const n = parseInt(lines[lineIdx++], 10);
    const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);

    let sum = 0;
    let count = 0;
    const negs = [];

    for (let i = 0; i < n; i++) {
      if (arr[i] >= 0) {
        sum += arr[i];
        count++;
      } else {
        negs.push(arr[i]);
      }
    }

    if (count === 0) {
      out.push(0);
      continue;
    }

    negs.sort((a, b) => b - a);

    for (let i = 0; i < negs.length; i++) {
      if (sum + negs[i] >= 0) {
        sum += negs[i];
        count++;
      } else {
        break;
      }
    }

    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
