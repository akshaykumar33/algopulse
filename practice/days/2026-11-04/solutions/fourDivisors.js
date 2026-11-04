var sumFourDivisors = function(nums) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    let count = 0;
    let sum = 0;
    for (let d = 1; d * d <= val; d++) {
      if (val % d === 0) {
        const other = val / d;
        if (d === other) {
          count++;
          sum += d;
        } else {
          count += 2;
          sum += d + other;
        }
        if (count > 4) break;
      }
    }
    if (count === 4) {
      totalSum += sum;
    }
  }
  return totalSum;
};

var fourDivisors = sumFourDivisors;
var solve = typeof fourDivisors !== 'undefined' ? fourDivisors : null;

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
