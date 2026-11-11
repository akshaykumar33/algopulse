const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const freq = new Int32Array(26);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    freq.fill(0);

    for (let i = 0; i < n; i++) {
      freq[s.charCodeAt(i) - 97]++;
    }

    let odd = 0;
    let distinct = 0;
    for (let c = 0; c < 26; c++) {
      if (freq[c] > 0) distinct++;
      if ((freq[c] & 1) === 1) odd++;
    }

    if (odd >= 2) {
      out.push(0);
    } else if ((n & 1) === 0) {
      out.push(1);
    } else {
      out.push(distinct === 1 ? 2 : 1);
    }
  }

  console.log(out.join('\n'));
}

solve();
