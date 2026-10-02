var smallerNumbersThanCurrent = function(nums) {
  const cnt = new Array(102).fill(0);
  for (const num of nums) {
    cnt[num + 1]++;
  }
  for (let i = 1; i <= 101; i++) {
    cnt[i] += cnt[i - 1];
  }
  const res = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    res[i] = cnt[nums[i]];
  }
  return res;
};

var solve = smallerNumbersThanCurrent;

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
