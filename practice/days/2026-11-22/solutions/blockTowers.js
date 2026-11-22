const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  let low = 1, high = 10000000, ans = high;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const c2 = Math.floor(mid / 2);
    const c3 = Math.floor(mid / 3);
    const c6 = Math.floor(mid / 6);
    if (c2 >= n && c3 >= m && (c2 + c3 - c6) >= (n + m)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  console.log(ans);
}
solve();