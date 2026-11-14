var countNicePairs = function(nums) {
  const MOD = 1000000007;
  const map = new Map();

  function rev(x) {
    let r = 0;
    while (x > 0) {
      r = r * 10 + (x % 10);
      x = Math.floor(x / 10);
    }
    return r;
  }

  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    const diff = nums[i] - rev(nums[i]);
    const cnt = map.get(diff) || 0;
    ans = (ans + cnt) % MOD;
    map.set(diff, cnt + 1);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(countNicePairs(JSON.parse(l))));
  }
}

module.exports = countNicePairs;
