const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const days = [];
    const count = new Int32Array(n + 1);
    const ans = new Int32Array(m);

    for (let i = 0; i < m; i++) {
      const k = parseInt(input[ptr++], 10);
      const friends = [];
      for (let j = 0; j < k; j++) friends.push(parseInt(input[ptr++], 10));
      days.push(friends);
      if (k === 1) {
        ans[i] = friends[0];
        count[friends[0]]++;
      }
    }

    const limit = Math.floor((m + 1) / 2);
    let ok = true;
    for (let i = 1; i <= n; i++) {
      if (count[i] > limit) {
        ok = false;
        break;
      }
    }

    if (!ok) {
      out.push('NO');
      continue;
    }

    for (let i = 0; i < m; i++) {
      if (ans[i] === 0) {
        let chosen = -1;
        for (const f of days[i]) {
          if (count[f] < limit) {
            chosen = f;
            break;
          }
        }
        if (chosen === -1) {
          ok = false;
          break;
        }
        ans[i] = chosen;
        count[chosen]++;
      }
    }

    if (!ok) {
      out.push('NO');
    } else {
      out.push('YES');
      out.push(ans.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
