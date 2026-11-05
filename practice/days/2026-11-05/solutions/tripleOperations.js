const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MAX = 200005;
  const ops = new Int32Array(MAX);
  const pref = new Int32Array(MAX);
  for (let i = 1; i < MAX; i++) {
    ops[i] = ops[Math.floor(i / 3)] + 1;
    pref[i] = pref[i - 1] + ops[i];
  }
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const l = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);
    const ans = ops[l] + (pref[r] - pref[l - 1]);
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();
