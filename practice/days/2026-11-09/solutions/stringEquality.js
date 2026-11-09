const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = input[ptr++];
    const b = input[ptr++];

    const cntA = new Int32Array(26);
    const cntB = new Int32Array(26);
    for (let i = 0; i < n; i++) {
      cntA[a.charCodeAt(i) - 97]++;
      cntB[b.charCodeAt(i) - 97]++;
    }

    let ok = true;
    for (let i = 0; i < 26; i++) {
      if (cntA[i] < cntB[i]) {
        ok = false;
        break;
      }
      const excess = cntA[i] - cntB[i];
      if (excess % k !== 0) {
        ok = false;
        break;
      }
      if (i < 25) {
        cntA[i + 1] += excess;
      } else if (excess !== 0) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
