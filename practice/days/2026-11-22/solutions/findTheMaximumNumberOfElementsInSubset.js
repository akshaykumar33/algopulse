var maximumLength = function(nums) {
  const counts = new Map();
  for (let i = 0; i < nums.length; i++) {
    counts.set(nums[i], (counts.get(nums[i]) || 0) + 1);
  }
  let ans = 1;
  if (counts.has(1)) {
    const c = counts.get(1);
    ans = Math.max(ans, c % 2 === 1 ? c : c - 1);
  }
  for (const [x, count] of counts.entries()) {
    if (x === 1) continue;
    let cur = x;
    let len = 0;
    while (counts.has(cur) && counts.get(cur) >= 2) {
      len += 2;
      cur = cur * cur;
    }
    if (counts.has(cur)) {
      len += 1;
    } else {
      len -= 1;
    }
    ans = Math.max(ans, len);
  }
  return ans;
};
var solve = maximumLength;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = maximumLength;