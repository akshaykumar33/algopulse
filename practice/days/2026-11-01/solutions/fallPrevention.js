const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    const pref = new Array(n);
    let cur = 0;
    let firstNeg = -1;
    for (let i = 0; i < n; i++) {
      cur += a[i];
      pref[i] = cur;
      if (cur < 0 && firstNeg === -1) {
        firstNeg = i;
      }
    }
    if (firstNeg === -1) {
      out.push('YES');
      continue;
    }
    const suffMin = new Array(n);
    suffMin[n - 1] = pref[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      suffMin[i] = Math.min(pref[i], suffMin[i + 1]);
    }
    let possible = false;
    for (let k = 0; k <= firstNeg; k++) {
      if (a[k] <= suffMin[k]) {
        possible = true;
        break;
      }
    }
    out.push(possible ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}

solve();
