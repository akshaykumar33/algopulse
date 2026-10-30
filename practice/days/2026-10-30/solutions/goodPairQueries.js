const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const p = tokens[ptr++];

    const pref01 = new Int32Array(n + 1);
    const pref10 = new Int32Array(n + 1);

    for (let i = 1; i <= n; i++) {
      pref01[i] = pref01[i - 1] + (s[i - 1] === '0' && p[i - 1] === '1' ? 1 : 0);
      pref10[i] = pref10[i - 1] + (s[i - 1] === '1' && p[i - 1] === '0' ? 1 : 0);
    }

    for (let qi = 0; qi < q; qi++) {
      const l = parseInt(tokens[ptr++], 10);
      const r = parseInt(tokens[ptr++], 10);
      const len = r - l + 1;
      const c01 = pref01[r] - pref01[l - 1];
      const c10 = pref10[r] - pref10[l - 1];

      if (len % 2 === 0 && c01 === c10) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
