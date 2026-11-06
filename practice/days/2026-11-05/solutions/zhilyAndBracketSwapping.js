const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    const b = tokens[ptr++];

    let totalOpen = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === '(') totalOpen++;
      if (b[i] === '(') totalOpen++;
    }

    if (totalOpen !== n) {
      out.push('NO');
      continue;
    }

    let c_both = 0, total_diff = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] !== b[i]) total_diff++;
      else if (a[i] === '(') c_both++;
    }

    const target = n / 2 - c_both;
    let min_x = 0, max_x = 0;
    let cur_both = 0, cur_diff = 0;
    let ok = true;

    for (let i = 1; i <= n; i++) {
      if (a[i - 1] !== b[i - 1]) {
        max_x++;
        cur_diff++;
      } else if (a[i - 1] === '(') {
        cur_both++;
      }

      const req = Math.ceil(i / 2);
      const L = Math.max(0, req - cur_both);
      const R = Math.min(cur_diff, cur_diff - (req - cur_both));

      min_x = Math.max(min_x, L);
      max_x = Math.min(max_x, R);

      min_x = Math.max(min_x, target - (total_diff - cur_diff));
      max_x = Math.min(max_x, target);

      if (min_x > max_x) {
        ok = false;
        break;
      }
    }

    out.push(ok && min_x <= target && target <= max_x ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
