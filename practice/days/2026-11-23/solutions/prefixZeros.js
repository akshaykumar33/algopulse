const fs = require('fs');

function can(m, s, k) {
  let ops = 0;
  for (let i = m - 1; i >= 0; i--) {
    const cur = (parseInt(s[i], 10) + ops) % 10;
    if (cur !== 0) {
      ops += 10 - cur;
      if (ops > k) return false;
    }
  }
  return ops <= k;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let low = 0, high = n, ans = 0;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (can(mid, s, k)) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
