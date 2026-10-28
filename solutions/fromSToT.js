const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const s = tokens[ptr++];
    const t = tokens[ptr++];
    const p = tokens[ptr++];

    let idxS = 0;
    for (let i = 0; i < t.length; i++) {
      if (idxS < s.length && s[idxS] === t[i]) {
        idxS++;
      }
    }

    if (idxS < s.length) {
      out.push('NO');
      continue;
    }

    const cntS = new Int32Array(26);
    const cntT = new Int32Array(26);
    const cntP = new Int32Array(26);

    for (let i = 0; i < s.length; i++) cntS[s.charCodeAt(i) - 97]++;
    for (let i = 0; i < t.length; i++) cntT[t.charCodeAt(i) - 97]++;
    for (let i = 0; i < p.length; i++) cntP[p.charCodeAt(i) - 97]++;

    let ok = true;
    for (let i = 0; i < 26; i++) {
      if (cntS[i] + cntP[i] < cntT[i]) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

