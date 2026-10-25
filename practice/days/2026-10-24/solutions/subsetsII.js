var subsetsWithDup = function(nums) {
  nums.sort((a, b) => a - b);
  const ans = [];
  const cur = [];

  function backtrack(start) {
    ans.push([...cur]);

    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
      cur.push(nums[i]);
      backtrack(i + 1);
      cur.pop();
    }
  }

  backtrack(0);
  return ans;
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
          const result = Array.isArray(parsed) && subsetsWithDup.length > 1 ? subsetsWithDup(...parsed) : subsetsWithDup(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(subsetsWithDup(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = subsetsWithDup;
