const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  const pref = new Int32Array(1025);
  for (let x = 1; x <= 1024; x++) {
    const s = x.toString(2);
    let cnt = 0;
    let idx = 0;
    while ((idx = s.indexOf('101010', idx)) !== -1) {
      cnt++;
      idx += 6;
    }
    pref[x] = pref[x - 1] + cnt;
  }

  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const n = parseInt(tokens[i], 10);
    if (!isNaN(n)) {
      out.push(pref[Math.min(1024, Math.max(0, n))]);
    }
  }
  console.log(out.join('\n'));
}

solve();
