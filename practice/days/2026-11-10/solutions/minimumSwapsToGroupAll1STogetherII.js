var minSwaps = function(nums) {
  const n = nums.length;
  let totalOnes = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) totalOnes++;
  }
  if (totalOnes <= 1 || totalOnes === n) return 0;
  let curOnes = 0;
  for (let i = 0; i < totalOnes; i++) {
    if (nums[i] === 1) curOnes++;
  }
  let maxOnes = curOnes;
  for (let i = totalOnes; i < n + totalOnes; i++) {
    if (nums[i % n] === 1) curOnes++;
    if (nums[(i - totalOnes) % n] === 1) curOnes--;
    if (curOnes > maxOnes) maxOnes = curOnes;
  }
  return totalOnes - maxOnes;
};

var solve = minSwaps;

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
  } catch (err) {}
}
module.exports = solve;
