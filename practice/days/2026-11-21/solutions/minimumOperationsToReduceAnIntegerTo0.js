var minOperations = function(n) {
  let ans = 0;
  while (n > 0) {
    if (n & 1) {
      if ((n & 2) && n !== 3) n++;
      else n--;
      ans++;
    }
    n >>= 1;
  }
  return ans;
};

var solve = minOperations;

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

module.exports = minOperations;