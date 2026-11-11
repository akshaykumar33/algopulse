const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const cnt = new Int32Array(26);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const target = tokens[ptr++];

    cnt.fill(0);
    let ok = true;

    for (let i = 0; i < n; i++) {
      if (i < k && i + k >= n && s[i] !== target[i]) {
        ok = false;
        break;
      }
      cnt[s.charCodeAt(i) - 97]++;
      cnt[target.charCodeAt(i) - 97]--;
    }

    if (ok) {
      for (let c = 0; c < 26; c++) {
        if (cnt[c] !== 0) {
          ok = false;
          break;
        }
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
