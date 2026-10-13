const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = lines[idx++];
    const p = parseInt(lines[idx++], 10);

    const counts = new Array(26).fill(0);
    let cost = 0;
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i) - 97;
      counts[code]++;
      cost += code + 1;
    }

    for (let c = 25; c >= 0; c--) {
      while (counts[c] > 0 && cost > p) {
        counts[c]--;
        cost -= c + 1;
      }
    }

    const res = [];
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i) - 97;
      if (counts[code] > 0) {
        res.push(s[i]);
        counts[code]--;
      }
    }

    out.push(res.join(''));
  }

  console.log(out.join('\n'));
}

solve();
