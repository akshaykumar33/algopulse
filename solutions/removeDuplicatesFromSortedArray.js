var removeDuplicates = function(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
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
          const result = Array.isArray(parsed) && removeDuplicates.length > 1 ? removeDuplicates(...parsed) : removeDuplicates(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(removeDuplicates(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = removeDuplicates;
