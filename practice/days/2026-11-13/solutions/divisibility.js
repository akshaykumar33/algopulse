const fs = require('fs');

function solve() {
  const parts = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!parts || parts.length < 3 || parts[0] === '') return;
  const k = BigInt(parts[0]);
  const a = BigInt(parts[1]);
  const b = BigInt(parts[2]);

  let ans = 0n;
  if (a >= 0n) {
    const total = b / k;
    const before = (a - 1n) < 0n ? -1n : (a - 1n) / k;
    ans = total - before;
  } else if (b <= 0n) {
    const newA = -b;
    const newB = -a;
    const total = newB / k;
    const before = (newA - 1n) < 0n ? -1n : (newA - 1n) / k;
    ans = total - before;
  } else {
    ans = (b / k) + ((-a) / k) + 1n;
  }

  console.log(ans.toString());
}

solve();
