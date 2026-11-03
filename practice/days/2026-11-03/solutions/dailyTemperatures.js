var dailyTemperatures = function(nums) {
    const n = nums.length;
    const ans = new Array(n).fill(0);
    const st = [];
    for (let i = 0; i < n; i++) {
        while (st.length > 0 && nums[i] > nums[st[st.length - 1]]) {
            const idx = st.pop();
            ans[idx] = i - idx;
        }
        st.push(i);
    }
    return ans;
};

var solve = typeof dailyTemperatures !== 'undefined' ? dailyTemperatures : null;

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
