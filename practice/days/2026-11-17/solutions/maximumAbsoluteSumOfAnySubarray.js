var maxAbsoluteSum = function(nums) {
  let minPref = 0;
  let maxPref = 0;
  let cur = 0;

  for (let i = 0; i < nums.length; i++) {
    cur += nums[i];
    if (cur < minPref) minPref = cur;
    if (cur > maxPref) maxPref = cur;
  }

  return maxPref - minPref;
};

var solve = maxAbsoluteSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
        console.log(JSON.stringify(solve(parsed[0])));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
