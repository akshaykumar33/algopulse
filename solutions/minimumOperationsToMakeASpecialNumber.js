var minimumOperations = function(num) {
  let n = num.length;
  let ans = num.includes('0') ? n - 1 : n;
  const targets = ['00', '25', '50', '75'];
  for (const t of targets) {
    let p = 1;
    for (let i = n - 1; i >= 0; i--) {
      if (num[i] === t[p]) {
        p--;
        if (p < 0) {
          ans = Math.min(ans, n - i - 2);
          break;
        }
      }
    }
  }
  return ans;
};

var solve = minimumOperations;

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

module.exports = minimumOperations;