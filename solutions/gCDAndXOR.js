const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));

    let first = -1, last = -1;
    for (let i = 0; i < n; i++) {
      if (a[i] !== k) {
        if (first === -1) first = i;
        last = i;
      }
    }

    if (first === -1) {
      out.push(0);
      continue;
    }

    let allDiv = true;
    for (let i = first; i <= last; i++) {
      if (a[i] % k !== 0) {
        allDiv = false;
        break;
      }
    }

    let allEqual = true;
    for (let i = first; i <= last; i++) {
      if (a[i] !== a[first]) {
        allEqual = false;
        break;
      }
    }

    if (allDiv || allEqual) {
      out.push(1);
    } else {
      out.push(2);
    }
  }
  console.log(out.join('\n'));
}
solve();