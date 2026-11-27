const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let cur = 0;
    const map = new Map();
    map.set(0, 1);
    let ans = 0;
    for (let i = 0; i < n; i++) {
      cur += s.charCodeAt(i) - 48 - 1;
      const count = map.get(cur) || 0;
      ans += count;
      map.set(cur, count + 1);
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
