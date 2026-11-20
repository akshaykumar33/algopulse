const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++];
    const n = s.length;
    let r = 0, g = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === 'R') r++;
      else g++;
    }
    if (r !== g) {
      out.push('no');
      continue;
    }
    let rr = 0, gg = 0;
    for (let i = 0; i < n; i++) {
      const next = s[(i + 1) % n];
      if (s[i] === 'R' && next === 'R') rr++;
      if (s[i] === 'G' && next === 'G') gg++;
    }
    if (rr === gg && rr <= 1) {
      out.push('yes');
    } else {
      out.push('no');
    }
  }
  console.log(out.join('\n'));
}
solve();