const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const last = new Int32Array(26).fill(-1);
    let minDiff = Infinity;
    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 97;
      if (last[c] !== -1) {
        const diff = i - last[c];
        if (diff < minDiff) minDiff = diff;
      }
      last[c] = i;
    }
    if (minDiff === Infinity) out.push(0);
    else out.push(n - minDiff);
  }
  console.log(out.join('\n'));
}
solve();