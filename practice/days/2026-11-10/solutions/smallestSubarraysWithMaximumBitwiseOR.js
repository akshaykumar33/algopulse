var smallestSubarrays = function(nums) {
  const n = nums.length;
  const ans = new Int32Array(n);
  const last = new Int32Array(30).fill(-1);
  for (let i = n - 1; i >= 0; i--) {
    let maxIdx = i;
    for (let b = 0; b < 30; b++) {
      if ((nums[i] >> b) & 1) {
        last[b] = i;
      }
      if (last[b] > maxIdx) {
        maxIdx = last[b];
      }
    }
    ans[i] = maxIdx - i + 1;
  }
  return Array.from(ans);
};

var solve = smallestSubarrays;

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
