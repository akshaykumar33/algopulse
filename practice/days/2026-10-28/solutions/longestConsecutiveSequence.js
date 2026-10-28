var longestConsecutive = function(nums) {
  if (nums.length === 0) return 0;
  const set = new Set(nums);
  let maxStreak = 0;

  for (const val of set) {
    if (!set.has(val - 1)) {
      let cur = val;
      let streak = 1;
      while (set.has(cur + 1)) {
        cur++;
        streak++;
      }
      if (streak > maxStreak) {
        maxStreak = streak;
      }
    }
  }

  return maxStreak;
};

var solve = function(nums) {
  return longestConsecutive(nums);
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
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

