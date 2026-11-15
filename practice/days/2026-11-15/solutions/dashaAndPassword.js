const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);

  const digit = new Int32Array(n).fill(1e9);
  const alpha = new Int32Array(n).fill(1e9);
  const special = new Int32Array(n).fill(1e9);

  for (let i = 0; i < n; i++) {
    const s = input[2 + i];
    for (let j = 0; j < m; j++) {
      const dist = Math.min(j, m - j);
      const ch = s[j];
      if (ch >= '0' && ch <= '9') {
        if (dist < digit[i]) digit[i] = dist;
      } else if (ch >= 'a' && ch <= 'z') {
        if (dist < alpha[i]) alpha[i] = dist;
      } else if (ch === '#' || ch === '*' || ch === '&') {
        if (dist < special[i]) special[i] = dist;
      }
    }
  }

  let ans = 1e9;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      for (let k = 0; k < n; k++) {
        if (k === i || k === j) continue;
        const sum = digit[i] + alpha[j] + special[k];
        if (sum < ans) ans = sum;
      }
    }
  }

  console.log(ans);
}

solve();
