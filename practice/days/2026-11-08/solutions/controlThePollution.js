const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);

    let minSmoke = Infinity;
    const maxBuses = Math.ceil(n / 100);

    for (let b = 0; b <= maxBuses; b++) {
      const rem = Math.max(0, n - b * 100);
      const c = Math.ceil(rem / 4);
      const smoke = b * x + c * y;
      if (smoke < minSmoke) {
        minSmoke = smoke;
      }
    }

    out.push(minSmoke);
  }

  console.log(out.join('\n'));
}

solve();
