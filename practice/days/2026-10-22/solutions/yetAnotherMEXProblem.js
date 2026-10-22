const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let idx = 0;
  const t = parseInt(input[idx++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[idx++], 10);
    const arr = input[idx++].trim().split(/\s+/).map(Number);
    let c0 = 0;
    let hasGt1 = false;
    for (let i = 0; i < n; i++) {
      if (arr[i] === 0) c0++;
      else if (arr[i] > 1) hasGt1 = true;
    }
    if (c0 <= Math.floor((n + 1) / 2)) {
      out.push(0);
    } else if (c0 === n || hasGt1) {
      out.push(1);
    } else {
      out.push(2);
    }
  }
  console.log(out.join('\n'));
}

solve();
