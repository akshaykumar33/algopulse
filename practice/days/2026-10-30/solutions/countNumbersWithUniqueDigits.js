var countNumbersWithUniqueDigits = function(n) {
  if (n === 0) return 1;
  let ans = 10;
  let cur = 9;
  for (let i = 2; i <= Math.min(n, 10); i++) {
    cur *= (11 - i);
    ans += cur;
  }
  return ans;
};

var solve = function(n) {
  return countNumbersWithUniqueDigits(n);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
