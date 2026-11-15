const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    let x = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    function isSorted(arr) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
      }
      return true;
    }

    if (isSorted(a)) {
      out.push(0);
      continue;
    }

    let ops = 0;
    while (!isSorted(a)) {
      let idx = -1;
      for (let i = 0; i < n; i++) {
        if (a[i] > x) {
          idx = i;
          break;
        }
      }
      if (idx === -1) {
        ops = -1;
        break;
      }
      const temp = a[idx];
      a[idx] = x;
      x = temp;
      ops++;
      if (ops > 2 * n) {
        ops = -1;
        break;
      }
    }
    out.push(ops);
  }
  console.log(out.join('\n'));
}

solve();
