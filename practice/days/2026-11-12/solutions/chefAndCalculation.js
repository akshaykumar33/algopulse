const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const cnt = new Int32Array(6);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let best = -1;
    let winner = 0;
    let tie = false;

    for (let i = 1; i <= n; i++) {
      const c = parseInt(tokens[ptr++], 10);
      cnt.fill(0);
      for (let j = 0; j < c; j++) {
        cnt[parseInt(tokens[ptr++], 10) - 1]++;
      }
      cnt.sort();
      const score = c + 2 * cnt[0] + cnt[1] + cnt[2];
      if (score > best) {
        best = score;
        winner = i;
        tie = false;
      } else if (score === best) {
        tie = true;
      }
    }

    if (tie) out.push('tie');
    else if (winner === 1) out.push('chef');
    else out.push(winner);
  }

  console.log(out.join('\n'));
}

solve();
