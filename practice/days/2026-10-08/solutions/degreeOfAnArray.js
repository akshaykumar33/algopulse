var findShortestSubArray = function(nums) {
  let count = new Map();
  let first = new Map();
  let last = new Map();
  let deg = 0;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (!first.has(x)) first.set(x, i);
    last.set(x, i);
    let c = (count.get(x) || 0) + 1;
    count.set(x, c);
    if (c > deg) deg = c;
  }
  let minLen = nums.length;
  for (let [x, c] of count.entries()) {
    if (c === deg) {
      let len = last.get(x) - first.get(x) + 1;
      if (len < minLen) minLen = len;
    }
  }
  return minLen;
};

const solve = findShortestSubArray;

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
