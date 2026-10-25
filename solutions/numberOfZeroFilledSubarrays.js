var zeroFilledSubarray = function(nums) {
    let ans = 0;
    let cnt = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            cnt++;
            ans += cnt;
        } else {
            cnt = 0;
        }
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
          const result = Array.isArray(parsed) && zeroFilledSubarray.length > 1 ? zeroFilledSubarray(...parsed) : zeroFilledSubarray(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(zeroFilledSubarray(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = zeroFilledSubarray;
