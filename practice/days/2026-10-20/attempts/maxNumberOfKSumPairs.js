var maxOperations = function(nums, k) {
  nums.sort((a, b) => a - b);
  let l = 0;
  let r = nums.length - 1;
  let ans = 0;
  while (l < r) {
    let sum = nums[l] + nums[r];
    if (sum === k) {
      ans++;
      l++;
      r--;
    } else if (sum < k) {
      l++;
    } else {
      r--;
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
      let nums = [];
      let k = 0;
      for (let i = 0; i < lines.length; i++) {
        if (i % 2 === 0) {
          nums = JSON.parse(lines[i]);
        } else {
          k = JSON.parse(lines[i]);
          console.log(JSON.stringify(maxOperations(nums, k)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = maxOperations;
