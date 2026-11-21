const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++].split('');
    const c = input[ptr++];
    const n = s.length;
    for (let i = 0; i < n; i++) {
      let minChar = s[i];
      let minIdx = -1;
      for (let j = n - 1; j > i; j--) {
        if (s[j] < minChar) {
          minChar = s[j];
          minIdx = j;
        }
      }
      if (minIdx !== -1) {
        const tmp = s[i];
        s[i] = s[minIdx];
        s[minIdx] = tmp;
        break;
      }
    }
    const res = s.join('');
    if (res < c) {
      out.push(res);
    } else {
      out.push('---');
    }
  }
  console.log(out.join('\n'));
}
solve();
