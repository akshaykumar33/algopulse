const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const dc = Math.round(parseFloat(tokens[ptr++]) * 100);
    const u = parseInt(tokens[ptr++], 10);
    const n = parseInt(tokens[ptr++], 10);

    let bestIdx = 0;
    let bestNum = dc * u;
    let bestDen = 1;

    for (let i = 1; i <= n; i++) {
      const m = parseInt(tokens[ptr++], 10);
      const rc = Math.round(parseFloat(tokens[ptr++]) * 100);
      const c = parseInt(tokens[ptr++], 10);
      const num = rc * u * m + 100 * c;
      if (num * bestDen < bestNum * m) {
        bestNum = num;
        bestDen = m;
        bestIdx = i;
      }
    }

    out.push(bestIdx);
  }

  console.log(out.join('\n'));
}

solve();
