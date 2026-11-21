var minSizeSubarray = function(nums, target) {
  const n = nums.length;
  let total = 0;
  for (let i = 0; i < n; i++) total += nums[i];
  const full = Math.floor(target / total);
  const rem = target % total;
  if (rem === 0) return full * n;
  const arr = nums.concat(nums);
  const map = new Map();
  map.set(0, -1);
  let cur = 0, minLen = Infinity;
  for (let i = 0; i < 2 * n; i++) {
    cur += arr[i];
    if (map.has(cur - rem)) {
      minLen = Math.min(minLen, i - map.get(cur - rem));
    }
    map.set(cur, i);
  }
  return minLen === Infinity ? -1 : full * n + minLen;
};

var solve = minSizeSubarray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minSizeSubarray;