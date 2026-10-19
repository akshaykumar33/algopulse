const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const votes = new Array(n + 1).fill(0);
    const disqualified = new Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v === i) {
        disqualified[i] = true;
      } else {
        votes[v]++;
      }
    }

    let ans = 0;
    for (let i = 1; i <= n; i++) {
      if (!disqualified[i] && votes[i] >= k) {
        ans++;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
