const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    let bestStr = null;
    let bestK = 1;

    for (let k = 1; k <= n; k++) {
      const suf = s.slice(k - 1);
      let pref = s.slice(0, k - 1);
      if ((n - k) % 2 === 0) {
        pref = pref.split('').reverse().join('');
      }
      const cand = suf + pref;
      if (bestStr === null || cand < bestStr) {
        bestStr = cand;
        bestK = k;
      }
    }

    out.push(bestStr);
    out.push(bestK);
  }

  console.log(out.join('\n'));
}

solve();

