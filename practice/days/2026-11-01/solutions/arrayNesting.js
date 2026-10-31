var arrayNesting = function(nums) {
    let n = nums.length;
    let vis = new Uint8Array(n);
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (!vis[i]) {
            let cur = i;
            let cnt = 0;
            while (!vis[cur]) {
                vis[cur] = 1;
                cur = nums[cur];
                cnt++;
            }
            if (cnt > ans) ans = cnt;
        }
    }
    return ans;
};
var solve = typeof arrayNesting !== 'undefined' ? arrayNesting : null;

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
