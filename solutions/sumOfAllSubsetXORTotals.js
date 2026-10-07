var subsetXORSum = function(nums) {
  let dfs = (i, x) => {
    if (i === nums.length) return x;
    return dfs(i + 1, x) + dfs(i + 1, x ^ nums[i]);
  };
  return dfs(0, 0);
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
          const result = Array.isArray(parsed) && subsetXORSum.length > 1 ? subsetXORSum(...parsed) : subsetXORSum(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(subsetXORSum(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = subsetXORSum;
