const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  const t = parseInt(input[0], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[tc + 1], 10);
    const ans = new Int32Array(n);
    let r = n - 1;

    while (r >= 0) {
      let s = Math.ceil(Math.sqrt(r));
      let sq = s * s;
      while (sq - r < 0) {
        s++;
        sq = s * s;
      }
      const k = sq - r;
      for (let i = k; i <= r; i++) {
        ans[i] = sq - i;
      }
      r = k - 1;
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
