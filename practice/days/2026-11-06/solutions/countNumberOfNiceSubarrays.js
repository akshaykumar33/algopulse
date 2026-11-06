var numberOfSubarrays = function(nums, k) {
  const count = new Int32Array(nums.length + 1);
  count[0] = 1;
  let cur = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    cur += (nums[i] & 1);
    if (cur >= k) {
      ans += count[cur - k];
    }
    count[cur]++;
  }

  return ans;
};

var solve = typeof numberOfSubarrays !== 'undefined' ? numberOfSubarrays : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(nums, k)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

