const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= tokens.length) break;
    const n = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const p = tokens[ptr++];

    const pref00 = new Int32Array(n + 1);
    const pref11 = new Int32Array(n + 1);
    const pref01 = new Int32Array(n + 1);
    const pref10 = new Int32Array(n + 1);

    for (let i = 1; i <= n; i++) {
      const sc = s.charCodeAt(i - 1);
      const pc = p.charCodeAt(i - 1);
      pref00[i] = pref00[i - 1] + (sc === 48 && pc === 48 ? 1 : 0);
      pref11[i] = pref11[i - 1] + (sc === 49 && pc === 49 ? 1 : 0);
      pref01[i] = pref01[i - 1] + (sc === 48 && pc === 49 ? 1 : 0);
      pref10[i] = pref10[i - 1] + (sc === 49 && pc === 48 ? 1 : 0);
    }

    for (let qi = 0; qi < q; qi++) {
      const l = parseInt(tokens[ptr++], 10);
      const r = parseInt(tokens[ptr++], 10);
      const c00 = pref00[r] - pref00[l - 1];
      const c11 = pref11[r] - pref11[l - 1];
      const c01 = pref01[r] - pref01[l - 1];
      const c10 = pref10[r] - pref10[l - 1];
      const diff = Math.abs(c01 - c10);
      const common = c00 + c11;

      if (diff <= common) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
