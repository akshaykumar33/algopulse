var minSteps = function(n) {
  let ans = 0;
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      ans += d;
      n = Math.floor(n / d);
    }
    d++;
  }
  return ans;
};

var solve = minSteps;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const n = JSON.parse(lines[i]);
        const result = solve(n);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = minSteps;
