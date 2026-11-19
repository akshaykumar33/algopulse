var countWays = function(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  let comps = 1;
  let maxEnd = ranges[0][1];

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i][0] > maxEnd) {
      comps++;
      maxEnd = ranges[i][1];
    } else {
      if (ranges[i][1] > maxEnd) {
        maxEnd = ranges[i][1];
      }
    }
  }

  let ans = 1;
  const MOD = 1000000007;
  for (let i = 0; i < comps; i++) {
    ans = (ans * 2) % MOD;
  }

  return ans;
};

var solve = countWays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const arg = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
      console.log(JSON.stringify(solve(arg)));
    }
  } catch (e) {}
}

module.exports = countWays;
