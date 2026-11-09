const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    const winL = new Int32Array(n).fill(-1);
    const winR = new Int32Array(n).fill(-1);
    let cur = 0;

    for (let r = 1; r < n; r++) {
      if (a[r] > a[cur]) {
        cur = r;
      }
      if (winL[cur] === -1) {
        winL[cur] = r;
      }
      winR[cur] = r;
    }

    for (let j = 0; j < q; j++) {
      const idx = parseInt(tokens[ptr++], 10) - 1;
      const k = parseInt(tokens[ptr++], 10);

      if (winL[idx] === -1 || k < winL[idx]) {
        out.push(0);
      } else {
        let ans = Math.min(k, winR[idx]) - winL[idx] + 1;
        if (a[idx] === n && k > n - 1) {
          ans += k - (n - 1);
        }
        out.push(ans);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
