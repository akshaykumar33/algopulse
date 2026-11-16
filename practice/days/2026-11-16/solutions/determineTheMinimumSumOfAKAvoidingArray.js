var minimumSum = function(n, k) {
  const half = Math.floor(k / 2);
  if (n <= half) {
    return (n * (n + 1)) / 2;
  }
  const sum1 = (half * (half + 1)) / 2;
  const rem = n - half;
  const sum2 = rem * k + (rem * (rem - 1)) / 2;
  return sum1 + sum2;
};

var solve = minimumSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
