var removeDuplicates = function(nums) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (k < 2 || nums[i] !== nums[k - 2]) {
            nums[k++] = nums[i];
        }
    }
    return k;
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
          const nums = [...parsed];
          const k = removeDuplicates(nums);
          const res = nums.slice(0, k);
          console.log(JSON.stringify(res));
        } catch {
          console.log(JSON.stringify(line));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = removeDuplicates;
