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
    const s = input[ptr++];

    let ans = 0;
    for (let i = 0; i < Math.floor((k + 1) / 2); i++) {
      const j = k - 1 - i;
      const freq = new Int32Array(26);
      let total = 0;

      for (let p = 0; p < n; p += k) {
        freq[s.charCodeAt(p + i) - 97]++;
        total++;
        if (i !== j) {
          freq[s.charCodeAt(p + j) - 97]++;
          total++;
        }
      }

      let maxF = 0;
      for (let c = 0; c < 26; c++) {
        if (freq[c] > maxF) maxF = freq[c];
      }
      ans += total - maxF;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
