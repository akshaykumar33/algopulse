const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const s = input[ptr++];
    const x1 = parseInt(input[ptr++], 10);
    const y1 = parseInt(input[ptr++], 10);
    const q = parseInt(input[ptr++], 10);

    let cntR = 0, cntL = 0, cntU = 0, cntD = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === 'R') cntR++;
      else if (s[i] === 'L') cntL++;
      else if (s[i] === 'U') cntU++;
      else if (s[i] === 'D') cntD++;
    }

    for (let k = 0; k < q; k++) {
      const x2 = parseInt(input[ptr++], 10);
      const y2 = parseInt(input[ptr++], 10);
      const dx = x2 - x1;
      const dy = y2 - y1;

      let possible = true;
      if (dx > 0 && cntR < dx) possible = false;
      if (dx < 0 && cntL < -dx) possible = false;
      if (dy > 0 && cntU < dy) possible = false;
      if (dy < 0 && cntD < -dy) possible = false;

      if (possible) {
        out.push('YES ' + (Math.abs(dx) + Math.abs(dy)));
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}
solve();