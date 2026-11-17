var beautifulSubarrays = function(nums) {
  const cnt = new Map();
  cnt.set(0, 1);
  let cur = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    cur ^= nums[i];
    const c = cnt.get(cur) || 0;
    ans += c;
    cnt.set(cur, c + 1);
  }

  return ans;
};

var solve = beautifulSubarrays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
