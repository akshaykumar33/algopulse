const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const q = parseInt(tokens[ptr++], 10);
  const s = tokens[ptr++];

  const out = [];

  for (let query = 0; query < q; query++) {
    const l = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);

    const sub = s.slice(l - 1, r).split('');
    let cp = 0;
    let dp = 1;
    const ans = new Array(10).fill(0);

    while (cp >= 0 && cp < sub.length) {
      const ch = sub[cp];
      if (ch >= '0' && ch <= '9') {
        const val = ch.charCodeAt(0) - 48;
        ans[val]++;
        if (val > 0) {
          sub[cp] = String.fromCharCode(val - 1 + 48);
          cp += dp;
        } else {
          sub.splice(cp, 1);
          if (dp === -1) {
            cp += dp;
          }
        }
      } else {
        if (ch === '<') dp = -1;
        else if (ch === '>') dp = 1;

        const next_cp = cp + dp;
        if (next_cp >= 0 && next_cp < sub.length && (sub[next_cp] === '<' || sub[next_cp] === '>')) {
          sub.splice(cp, 1);
          if (dp === 1) {
            cp = next_cp - 1;
          } else {
            cp = next_cp;
          }
        } else {
          cp = next_cp;
        }
      }
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
