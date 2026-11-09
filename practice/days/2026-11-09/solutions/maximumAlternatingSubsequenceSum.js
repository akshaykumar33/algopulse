var maxAlternatingSum = function(nums) {
  let even = 0;
  let odd = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const nextEven = Math.max(even, odd + x);
    const nextOdd = Math.max(odd, even - x);
    even = nextEven;
    odd = nextOdd;
  }
  return even;
};

var solve = maxAlternatingSum;

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
