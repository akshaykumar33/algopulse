const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const l = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    if (l === 1) {
      out.push('8');
    } else if (l === 2) {
      let best = '', minDiff = 3;
      for (let cand = 16; cand <= 96; cand += 8) {
        const cStr = String(cand);
        let diff = 0;
        if (s[0] !== cStr[0]) diff++;
        if (s[1] !== cStr[1]) diff++;
        if (diff < minDiff) {
          minDiff = diff;
          best = cStr;
        }
      }
      out.push(best);
    } else {
      const prefix = s.slice(0, l - 3);
      const tail = s.slice(l - 3);
      let best = '', minDiff = 4;
      const start = l === 3 ? 104 : 0;
      for (let cand = start; cand <= 992; cand += 8) {
        const cStr = String(cand).padStart(3, '0');
        let diff = 0;
        if (tail[0] !== cStr[0]) diff++;
        if (tail[1] !== cStr[1]) diff++;
        if (tail[2] !== cStr[2]) diff++;
        if (diff < minDiff) {
          minDiff = diff;
          best = cStr;
        }
      }
      out.push(prefix + best);
    }
  }
  console.log(out.join('\n'));
}
solve();