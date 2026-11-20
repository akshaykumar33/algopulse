const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

    let possible = false;
    for (let i = 0; i < n; i++) {
      const val = a[i];
      let first = null;
      let ok = true;
      for (let j = 0; j < n; j++) {
        const cur = j < i ? a[j] + val : a[j] - val;
        if (first === null) first = cur;
        else if (cur !== first) {
          ok = false;
          break;
        }
      }
      if (ok) {
        possible = true;
        break;
      }
    }
    out.push(possible ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();
