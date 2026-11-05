var fruitIntoBaskets = function(nums) {
    let left = 0;
    let maxLen = 0;
    let count = new Map();
    
    for (let right = 0; right < nums.length; right++) {
        let val = nums[right];
        count.set(val, (count.get(val) || 0) + 1);
        
        while (count.size > 2) {
            let leftVal = nums[left];
            count.set(leftVal, count.get(leftVal) - 1);
            if (count.get(leftVal) === 0) {
                count.delete(leftVal);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};

var solve = typeof fruitIntoBaskets !== 'undefined' ? fruitIntoBaskets : null;

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
