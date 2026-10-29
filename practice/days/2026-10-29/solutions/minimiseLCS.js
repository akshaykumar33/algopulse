const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = input[ptr++];
    const b = input[ptr++];

    const cntA = new Int32Array(26);
    const cntB = new Int32Array(26);

    for (let i = 0; i < n; i++) {
      cntA[a.charCodeAt(i) - 97]++;
      cntB[b.charCodeAt(i) - 97]++;
    }

    let maxMatch = 0;
    for (let c = 0; c < 26; c++) {
      const common = Math.min(cntA[c], cntB[c]);
      if (common > maxMatch) {
        maxMatch = common;
      }
    }

    out.push(maxMatch);
  }

  console.log(out.join('\n'));
}

solve();

