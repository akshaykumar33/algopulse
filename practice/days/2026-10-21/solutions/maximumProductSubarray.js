var solve = function(nums) {
    let maxProd = nums[0];
    let curMax = nums[0];
    let curMin = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        let n = nums[i];
        let tempMax = curMax;
        curMax = Math.max(n, Math.max(n * curMax, n * curMin));
        curMin = Math.min(n, Math.min(n * tempMax, n * curMin));
        maxProd = Math.max(maxProd, curMax);
    }
    
    return maxProd;
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
