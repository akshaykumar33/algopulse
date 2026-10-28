const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let cntPos = 0;
    let cntNeg = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v === 1) cntPos++;
      else cntNeg++;
    }

    const diff = Math.abs(cntPos - cntNeg);
    if (diff < 2) {
      out.push('Yes');
    } else if (diff === 2) {
      if (cntPos % 2 === 0) out.push('Yes');
      else out.push('No');
    } else {
      out.push('No');
    }
  }

  console.log(out.join('\n'));
}

solve();

