const fs = require('fs');

function solve() {
  const line = fs.readFileSync(0, 'utf-8').trim();
  if (!line) return;
  const [b, l, s] = line.split(/\s+/).map(BigInt);
  let m = b;
  if (l > m) m = l;
  if (s > m) m = s;
  const target = m > 0n ? m - 1n : 0n;
  let ans = 0n;
  if (b < target) ans += target - b;
  if (l < target) ans += target - l;
  if (s < target) ans += target - s;
  console.log(ans.toString());
}

solve();
