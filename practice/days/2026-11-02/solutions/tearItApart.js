const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;

    let ans = n;
    for (let code = 97; code <= 122; code++) {
      const c = String.fromCharCode(code);
      let last = -1;
      let maxGap = 0;
      let count = 0;

      for (let i = 0; i < n; i++) {
        if (s[i] === c) {
          count++;
          const gap = i - last - 1;
          if (gap > maxGap) maxGap = gap;
          last = i;
        }
      }

      if (count === 0) continue;

      const gap = n - last - 1;
      if (gap > maxGap) maxGap = gap;

      let ops = 0;
      let g = maxGap;
      while (g > 0) {
        ops++;
        g = Math.floor(g / 2);
      }

      if (ops < ans) ans = ops;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

