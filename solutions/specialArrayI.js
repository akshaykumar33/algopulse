var isArraySpecial = function(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    if ((nums[i] & 1) === (nums[i + 1] & 1)) {
      return false;
    }
  }
  return true;
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
          const result = Array.isArray(parsed) && isArraySpecial.length > 1 ? isArraySpecial(...parsed) : isArraySpecial(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(isArraySpecial(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = isArraySpecial;
