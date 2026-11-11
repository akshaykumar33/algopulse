const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const cntA = new Int32Array(26);
  const cntB = new Int32Array(26);

  for (let tc = 0; tc < t; tc++) {
    let n = parseInt(tokens[ptr++], 10);
    let m = parseInt(tokens[ptr++], 10);
    let a = tokens[ptr++];
    let b = tokens[ptr++];
    if (n < m) {
      const tmpLen = n;
      n = m;
      m = tmpLen;
      const tmpStr = a;
      a = b;
      b = tmpStr;
    }

    cntA.fill(0);
    cntB.fill(0);
    for (let i = 0; i < n; i++) cntA[a.charCodeAt(i) - 97]++;
    for (let i = 0; i < m; i++) cntB[b.charCodeAt(i) - 97]++;

    let ok = true;
    let odd = 0;
    for (let c = 0; c < 26; c++) {
      const d = cntA[c] - cntB[c];
      if (d < 0) {
        ok = false;
        break;
      }
      if ((d & 1) === 1) odd++;
    }
    if (odd > 1) ok = false;
    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
