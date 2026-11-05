const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    const cnt = new Int32Array(10);
    for (let i = 0; i < s.length; i++) {
      cnt[s.charCodeAt(i) - 48]++;
    }

    let res = '';
    for (let code = 65; code <= 90; code++) {
      const d1 = Math.floor(code / 10);
      const d2 = code % 10;
      if (d1 === d2) {
        if (cnt[d1] >= 2) {
          res += String.fromCharCode(code);
        }
      } else {
        if (cnt[d1] >= 1 && cnt[d2] >= 1) {
          res += String.fromCharCode(code);
        }
      }
    }

    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();
