var countStaircase = function(nums) {
  const n = nums.length;
  const cnt = new Int32Array(100001), rk = new Int32Array(100001);
  let ans = 0;
  for (let l = 0; l < n; l++) {
    let k = 0, good = 0;
    for (let r = l; r < n; r++) {
      const x = nums[r];
      if (cnt[x] === 0) rk[x] = ++k;
      else if (cnt[x] === rk[x]) good--;
      cnt[x]++;
      if (cnt[x] === rk[x]) good++;
      if (good === k) ans++;
    }
    for (let r = l; r < n; r++) cnt[nums[r]] = 0;
  }
  return ans;
};
var solve = countStaircase;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = countStaircase;
