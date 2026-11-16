var findPrimePairs = function(n) {
  const isPrime = new Uint8Array(n + 1).fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= n; i += p) isPrime[i] = 0;
    }
  }

  const ans = [];
  for (let x = 2; x <= Math.floor(n / 2); x++) {
    if (isPrime[x] && isPrime[n - x]) {
      ans.push([x, n - x]);
    }
  }
  return ans;
};

var solve = findPrimePairs;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
