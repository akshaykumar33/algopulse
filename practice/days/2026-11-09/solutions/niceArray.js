const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    let minSum = 0;
    let flex = 0;

    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      minSum += Math.floor(v / k);
      if (v % k !== 0) flex++;
    }

    if (minSum <= 0 && minSum + flex >= 0) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
