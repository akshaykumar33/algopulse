var countInterestingSubarrays = function(nums, modulo, k) {
  const map = new Map();
  map.set(0, 1);
  let pref = 0;
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % modulo === k) {
      pref = (pref + 1) % modulo;
    }
    const target = (pref - k + modulo) % modulo;
    if (map.has(target)) {
      ans += map.get(target);
    }
    map.set(pref, (map.get(pref) || 0) + 1);
  }
  return ans;
};

var solve = countInterestingSubarrays;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
