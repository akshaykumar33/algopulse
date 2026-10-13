const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(lines[idx++], 10);
    const arr = [];
    const set = new Set();
    for (let i = 0; i < n; i++) {
      const s = lines[idx++];
      arr.push(s);
      set.add(s);
    }

    const res = [];
    for (let i = 0; i < n; i++) {
      const s = arr[i];
      let ok = false;
      for (let j = 1; j < s.length; j++) {
        const pref = s.slice(0, j);
        const suff = s.slice(j);
        if (set.has(pref) && set.has(suff)) {
          ok = true;
          break;
        }
      }
      res.push(ok ? '1' : '0');
    }

    out.push(res.join(''));
  }

  console.log(out.join('\n'));
}

solve();
