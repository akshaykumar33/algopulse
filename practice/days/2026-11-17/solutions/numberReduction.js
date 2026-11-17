const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let k = parseInt(tokens[ptr++], 10);
    const n = s.length;
    const rem = n - k;
    const pos = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < n; i++) {
      pos[s.charCodeAt(i) - 48].push(i);
    }
    const dPtr = new Array(10).fill(0);

    let cur = -1;
    let ans = '';

    for (let d = 1; d <= 9; d++) {
      while (dPtr[d] < pos[d].length && pos[d][dPtr[d]] <= cur) dPtr[d]++;
      if (dPtr[d] < pos[d].length && pos[d][dPtr[d]] <= k) {
        ans += d;
        k -= pos[d][dPtr[d]];
        cur = pos[d][dPtr[d]];
        break;
      }
    }

    while (ans.length < rem) {
      for (let d = 0; d <= 9; d++) {
        while (dPtr[d] < pos[d].length && pos[d][dPtr[d]] <= cur) dPtr[d]++;
        if (dPtr[d] < pos[d].length && pos[d][dPtr[d]] <= cur + 1 + k) {
          ans += d;
          k -= (pos[d][dPtr[d]] - cur - 1);
          cur = pos[d][dPtr[d]];
          break;
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
