var sumEvenAfterQueries = function(nums, queries) {
  let evenSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) evenSum += nums[i];
  }
  const ans = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const val = queries[i][0];
    const idx = queries[i][1];
    if (nums[idx] % 2 === 0) evenSum -= nums[idx];
    nums[idx] += val;
    if (nums[idx] % 2 === 0) evenSum += nums[idx];
    ans[i] = evenSum;
  }
  return ans;
};

var solve = sumEvenAfterQueries;

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
