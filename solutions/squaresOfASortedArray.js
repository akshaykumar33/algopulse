var sortedSquares = function(nums) {
  let n = nums.length;
  let res = new Array(n);
  let l = 0, r = n - 1;
  let idx = n - 1;
  while (l <= r) {
    let leftVal = nums[l] * nums[l];
    let rightVal = nums[r] * nums[r];
    if (leftVal > rightVal) {
      res[idx] = leftVal;
      l++;
    } else {
      res[idx] = rightVal;
      r--;
    }
    idx--;
  }
  return res;
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
          const result = Array.isArray(parsed) && sortedSquares.length > 1 ? sortedSquares(...parsed) : sortedSquares(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(sortedSquares(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = sortedSquares;
