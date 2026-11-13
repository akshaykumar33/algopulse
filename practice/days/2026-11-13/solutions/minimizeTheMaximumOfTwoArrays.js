var minimizeSet = function(divisor1, divisor2, uniqueCnt1, uniqueCnt2) {
  const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
  const d1 = BigInt(divisor1);
  const d2 = BigInt(divisor2);
  const c1 = BigInt(uniqueCnt1);
  const c2 = BigInt(uniqueCnt2);
  const g = gcd(d1, d2);
  const lcm = (d1 / g) * d2;

  let low = 1n;
  let high = 10000000000n;
  let ans = high;

  while (low <= high) {
    const mid = (low + high) >> 1n;
    const cnt1 = mid - mid / d1;
    const cnt2 = mid - mid / d2;
    const total = mid - mid / lcm;

    if (cnt1 >= c1 && cnt2 >= c2 && total >= c1 + c2) {
      ans = mid;
      high = mid - 1n;
    } else {
      low = mid + 1n;
    }
  }

  return Number(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      try {
        const p = JSON.parse(l);
        return Array.isArray(p) && p.length === 4;
      } catch (_) {
        return false;
      }
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(minimizeSet(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 3 < lines.length; i += 4) {
        const args = lines.slice(i, i + 4).map((l) => JSON.parse(l));
        console.log(JSON.stringify(minimizeSet(...args)));
      }
    }
  }
}

module.exports = minimizeSet;
