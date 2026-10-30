var findNthDigit = function(n) {
  let len = 1;
  let count = 9;
  let start = 1;
  while (n > len * count) {
    n -= len * count;
    len++;
    count *= 10;
    start *= 10;
  }
  start += Math.floor((n - 1) / len);
  const s = start.toString();
  return parseInt(s[(n - 1) % len], 10);
};

var solve = function(n) {
  return findNthDigit(n);
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
