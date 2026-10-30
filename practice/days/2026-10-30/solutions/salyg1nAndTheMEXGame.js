const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let mex = 0;
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if (val === mex) mex++;
    }

    while (ptr < tokens.length) {
      out.push(mex);
      const resp = parseInt(tokens[ptr++], 10);
      if (resp === -1) break;
      mex = resp;
    }
  }
  console.log(out.join('\n'));
}

solve();
