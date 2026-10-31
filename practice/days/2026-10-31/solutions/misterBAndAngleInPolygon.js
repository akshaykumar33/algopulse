const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const [nStr, aStr] = input.split(/\s+/);
  const n = parseInt(nStr, 10);
  const a = parseFloat(aStr);

  let bestK = 1;
  let minDiff = Infinity;

  for (let k = 1; k <= n - 2; k++) {
    const ang = (k * 180) / n;
    const diff = Math.abs(ang - a);
    if (diff < minDiff) {
      minDiff = diff;
      bestK = k;
    }
  }

  const v3 = n - bestK + 1;
  console.log(`1 2 ${v3}`);
}

solve();
