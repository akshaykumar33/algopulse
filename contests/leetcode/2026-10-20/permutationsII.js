var permuteUnique = function(nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    const vis = new Array(nums.length).fill(false);
    const backtrack = (path) => {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (vis[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1]) continue;
            vis[i] = true;
            path.push(nums[i]);
            backtrack(path);
            path.pop();
            vis[i] = false;
        }
    };
    backtrack([]);
    return res;
};
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && permuteUnique.length > 1 ? permuteUnique(...parsed) : permuteUnique(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(permuteUnique(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = permuteUnique;
