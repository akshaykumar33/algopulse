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
    const f = parseInt(tokens[ptr++], 10);
    let missingSum = 0;
    for (let i = 0; i < f; i++) {
      missingSum += parseInt(tokens[ptr++], 10);
    }
    const leavesTorn = parseFloat(tokens[ptr++]);
    const totalSum = (n * (n + 1)) / 2;
    const remainingSum = totalSum - missingSum;
    const l = Math.floor((n + 1) / 2);
    const ans = (remainingSum * (l - leavesTorn)) / l;
    out.push(ans.toFixed(4));
  }

  console.log(out.join('\n'));
}

solve();
