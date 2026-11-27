const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const c = new Int32Array(n);
    const w = new Float64Array(n);
    for (let i = 0; i < n; i++) c[i] = parseInt(tokens[ptr++], 10);
    for (let i = 0; i < n; i++) w[i] = Number(tokens[ptr++]);
    let l = 0;
    let curW = 0;
    let maxW = 0;
    const map = new Map();
    for (let r = 0; r < n; r++) {
      curW += w[r];
      map.set(c[r], (map.get(c[r]) || 0) + 1);
      while (map.get(c[r]) > 1) {
        map.set(c[l], map.get(c[l]) - 1);
        curW -= w[l];
        l++;
      }
      if (curW > maxW) maxW = curW;
    }
    out.push(Math.round(maxW));
  }
  console.log(out.join('\n'));
}
