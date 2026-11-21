function gcd(a, b) {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

var nthUglyNumber = function(n, a, b, c) {
  const bigA = BigInt(a), bigB = BigInt(b), bigC = BigInt(c);
  const bigAB = lcm(bigA, bigB);
  const bigBC = lcm(bigB, bigC);
  const bigAC = lcm(bigA, bigC);
  const bigABC = lcm(bigAB, bigC);
  const bigN = BigInt(n);

  let lo = 1n, hi = 2000000000n, ans = hi;
  while (lo <= hi) {
    const mid = (lo + hi) / 2n;
    const count = mid / bigA + mid / bigB + mid / bigC - mid / bigAB - mid / bigBC - mid / bigAC + mid / bigABC;
    if (count >= bigN) {
      ans = mid;
      hi = mid - 1n;
    } else {
      lo = mid + 1n;
    }
  }
  return Number(ans);
};

var solve = nthUglyNumber;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2], parsed[3])));
    }
  } catch (e) {}
}

module.exports = nthUglyNumber;