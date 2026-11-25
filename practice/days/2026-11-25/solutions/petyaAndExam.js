const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const goodStr = data[ptr++];
  const pat = data[ptr++];
  const n = parseInt(data[ptr++], 10);
  const good = new Uint8Array(26);
  for (let i = 0; i < goodStr.length; i++) {
    good[goodStr.charCodeAt(i) - 97] = 1;
  }
  const star = pat.indexOf('*');
  const m = pat.length;
  const out = [];
  for (let t = 0; t < n; t++) {
    const q = data[ptr++];
    const len = q.length;
    let ok = true;
    if (star === -1) {
      if (len !== m) {
        ok = false;
      } else {
        for (let i = 0; i < m; i++) {
          const pc = pat[i];
          if (pc === '?') {
            if (!good[q.charCodeAt(i) - 97]) {
              ok = false;
              break;
            }
          } else if (pc !== q[i]) {
            ok = false;
            break;
          }
        }
      }
    } else {
      if (len < m - 1) {
        ok = false;
      } else {
        for (let i = 0; i < star; i++) {
          const pc = pat[i];
          if (pc === '?') {
            if (!good[q.charCodeAt(i) - 97]) {
              ok = false;
              break;
            }
          } else if (pc !== q[i]) {
            ok = false;
            break;
          }
        }
        const sufLen = m - 1 - star;
        if (ok) {
          for (let i = 0; i < sufLen; i++) {
            const pc = pat[star + 1 + i];
            const qi = len - sufLen + i;
            if (pc === '?') {
              if (!good[q.charCodeAt(qi) - 97]) {
                ok = false;
                break;
              }
            } else if (pc !== q[qi]) {
              ok = false;
              break;
            }
          }
        }
        if (ok) {
          const endMid = len - sufLen;
          for (let i = star; i < endMid; i++) {
            if (good[q.charCodeAt(i) - 97]) {
              ok = false;
              break;
            }
          }
        }
      }
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
