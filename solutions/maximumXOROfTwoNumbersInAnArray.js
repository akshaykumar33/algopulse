var findMaximumXOR = function(nums) {
  let max = 0;
  let mask = 0;
  for (let i = 31; i >= 0; i--) {
    mask |= (1 << i);
    const set = new Set();
    for (const num of nums) {
      set.add(num & mask);
    }
    const greedy = max | (1 << i);
    let found = false;
    for (const prefix of set) {
      if (set.has(prefix ^ greedy)) {
        found = true;
        break;
      }
    }
    if (found) {
      max = greedy;
    }
  }
  return max;
};
var solve = findMaximumXOR;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
