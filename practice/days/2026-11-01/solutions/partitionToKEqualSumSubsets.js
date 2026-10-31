var partitionKSubsets = function(nums, k) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  if (sum % k !== 0) return false;
  let target = sum / k;
  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;
  
  let groups = new Array(k).fill(0);
  
  function dfs(idx) {
    if (idx === nums.length) return true;
    let val = nums[idx];
    for (let i = 0; i < k; i++) {
      if (groups[i] + val <= target) {
        groups[i] += val;
        if (dfs(idx + 1)) return true;
        groups[i] -= val;
      }
      if (groups[i] === 0) break;
    }
    return false;
  }
  
  return dfs(0);
};
var solve = typeof partitionKSubsets !== 'undefined' ? partitionKSubsets : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        const result = solve(nums, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
