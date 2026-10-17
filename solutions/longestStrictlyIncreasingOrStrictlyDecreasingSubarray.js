var longestMonotonicSubarray = function(nums) {
    if (nums.length === 0) return 0;
    let ans = 1;
    let inc = 1;
    let dec = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            inc++;
            dec = 1;
        } else if (nums[i] < nums[i - 1]) {
            dec++;
            inc = 1;
        } else {
            inc = 1;
            dec = 1;
        }
        ans = Math.max(ans, inc, dec);
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
          const result = Array.isArray(parsed) && longestMonotonicSubarray.length > 1 ? longestMonotonicSubarray(...parsed) : longestMonotonicSubarray(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(longestMonotonicSubarray(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = longestMonotonicSubarray;
