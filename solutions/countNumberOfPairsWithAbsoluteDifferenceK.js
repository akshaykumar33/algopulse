var countKDifference = function(nums, k) {
  let ans = 0;
  const cnt = new Map();
  for (const x of nums) {
    ans += (cnt.get(x - k) || 0) + (cnt.get(x + k) || 0);
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && countKDifference.length > 1 ? countKDifference(...parsed) : countKDifference(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(countKDifference(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = countKDifference;
