const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  let ans = 0;

  for (let i = 0; i < n; i++) {
    const s = input[ptr++];
    let ok = true;
    for (let d = 0; d <= k; d++) {
      if (!s.includes(String(d))) {
        ok = false;
        break;
      }
    }
    if (ok) ans++;
  }

  console.log(ans);
}

solve();
