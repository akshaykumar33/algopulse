const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++].split('');
    let c0 = 0, c1 = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '0') c0++;
      else if (s[i] === '1') c1++;
    }
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '?') {
        if (c0 <= c1) {
          s[i] = '0';
          c0++;
        } else {
          s[i] = '1';
          c1++;
        }
      }
    }
    out.push(s.join(''));
  }
  console.log(out.join('\n'));
}
solve();
