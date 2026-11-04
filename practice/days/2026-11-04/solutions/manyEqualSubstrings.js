const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);
  const t = input[2];

  let p = 0;
  for (let len = n - 1; len >= 1; len--) {
    if (t.slice(0, len) === t.slice(n - len)) {
      p = len;
      break;
    }
  }

  const suffix = t.slice(p);
  const ans = t + suffix.repeat(k - 1);
  console.log(ans);
}

solve();

