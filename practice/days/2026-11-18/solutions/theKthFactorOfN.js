var kthFactor = function(n, k) {
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      k--;
      if (k === 0) return i;
    }
  }
  return -1;
};

var solve = kthFactor;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = kthFactor;
