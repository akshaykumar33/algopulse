const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    const cntEven = new Int32Array(26);
    const cntOdd = new Int32Array(26);

    for (let i = 0; i < n; i++) {
      const c = s.charCodeAt(i) - 97;
      if (i % 2 === 0) cntEven[c]++;
      else cntOdd[c]++;
    }

    let ok = true;
    for (let i = 0; i < 26; i++) {
      if (cntEven[i] !== cntOdd[i]) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
