const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const x = parseInt(tokens[ptr++], 10);
    let k = Math.floor((Math.sqrt(8 * x + 1) - 1) / 2);
    let ans = x;

    for (let cur = Math.max(0, k - 2); cur <= k + 2; cur++) {
      const pos = Math.floor((cur * (cur + 1)) / 2);
      const time = cur + Math.abs(x - pos);
      if (time < ans) {
        ans = time;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
