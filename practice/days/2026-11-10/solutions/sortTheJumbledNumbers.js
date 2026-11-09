var sortJumbled = function(mapping, nums) {
  const n = nums.length;
  const mapped = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const s = String(nums[i]);
    let val = 0;
    for (let j = 0; j < s.length; j++) {
      val = val * 10 + mapping[s.charCodeAt(j) - 48];
    }
    mapped[i] = val;
  }
  const idx = new Int32Array(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  idx.sort((a, b) => {
    if (mapped[a] !== mapped[b]) return mapped[a] - mapped[b];
    return a - b;
  });
  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    ans[i] = nums[idx[i]];
  }
  return ans;
};

var solve = sortJumbled;

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
