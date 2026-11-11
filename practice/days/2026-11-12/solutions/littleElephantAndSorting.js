const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  let prev = parseInt(tokens[ptr++], 10);
  let ans = 0;

  for (let i = 1; i < n; i++) {
    const cur = parseInt(tokens[ptr++], 10);
    if (cur < prev) {
      ans += prev - cur;
    }
    prev = cur;
  }

  console.log(ans);
}

solve();
