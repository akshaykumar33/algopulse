const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let hasGe2 = false;
    let ones = 0;
    for (let i = 0; i < n; i++) {
      const a = parseInt(tokens[ptr++], 10);
      if (a >= 2) hasGe2 = true;
      else if (a === 1) ones++;
    }
    if (hasGe2) out.push(499122177);
    else out.push(ones & 1);
  }

  console.log(out.join('\n'));
}

solve();
