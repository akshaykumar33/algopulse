const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  let t = parseInt(input[ptr++], 10);
  const out = [];
  while (t-- > 0) {
    const n = parseInt(input[ptr++], 10);
    let maxSales = 0;
    let pref = 0;
    for (let i = 0; i < n; i++) {
      const a = parseInt(input[ptr++], 10);
      const cur = pref + 2 * a;
      if (cur > maxSales) maxSales = cur;
      pref += a;
    }
    out.push(maxSales);
  }
  console.log(out.join('\n'));
}

solve();
