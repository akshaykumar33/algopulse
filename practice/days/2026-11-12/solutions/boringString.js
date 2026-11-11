const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const max1 = new Int32Array(26);
  const max2 = new Int32Array(26);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    max1.fill(0);
    max2.fill(0);

    let i = 0;
    while (i < n) {
      let j = i + 1;
      const code = s.charCodeAt(i);
      while (j < n && s.charCodeAt(j) === code) j++;
      const len = j - i;
      const c = code - 97;
      if (len >= max1[c]) {
        max2[c] = max1[c];
        max1[c] = len;
      } else if (len > max2[c]) {
        max2[c] = len;
      }
      i = j;
    }

    let ans = 0;
    for (let c = 0; c < 26; c++) {
      if (max1[c] - 1 > ans) ans = max1[c] - 1;
      if (max2[c] > ans) ans = max2[c];
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
