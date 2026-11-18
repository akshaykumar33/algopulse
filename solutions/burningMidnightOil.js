const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const parts = input.split(/\s+/);
  const n = parseInt(parts[0], 10);
  const k = parseInt(parts[1], 10);

  function check(v) {
    let sum = 0;
    let cur = v;
    while (cur > 0) {
      sum += cur;
      if (sum >= n) return true;
      cur = Math.floor(cur / k);
    }
    return sum >= n;
  }

  let low = 1, high = n, ans = n;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (check(mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  console.log(ans);
}

solve();
