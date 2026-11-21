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
    let ans = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
    const op = input[ptr++];

    if (k === 0) {
      out.push(ans);
      continue;
    }

    if (op === 'AND') {
      let combined = a[0];
      for (let i = 1; i < n; i++) combined &= a[i];
      ans &= combined;
    } else if (op === 'OR') {
      let combined = a[0];
      for (let i = 1; i < n; i++) combined |= a[i];
      ans |= combined;
    } else if (op === 'XOR') {
      if (k % 2 === 1) {
        let combined = 0;
        for (let i = 0; i < n; i++) combined ^= a[i];
        ans ^= combined;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();