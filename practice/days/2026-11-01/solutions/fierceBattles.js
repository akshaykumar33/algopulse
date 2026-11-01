const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const soint = new Array(105).fill(0);
    const sofloat = new Array(105).fill(0);
    for (let i = 0; i < n; i++) {
      const c = parseInt(tokens[ptr++], 10);
      const l = parseInt(tokens[ptr++], 10);
      soint[l] += c;
    }
    for (let i = 0; i < m; i++) {
      const c = parseInt(tokens[ptr++], 10);
      const l = parseInt(tokens[ptr++], 10);
      sofloat[l] += c;
    }
    let ans = 0;
    for (let l = 1; l <= 100; l++) {
      if (sofloat[l] > soint[l]) {
        ans += sofloat[l] - soint[l];
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
