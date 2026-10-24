var permute = function(nums) {
  const res = [];
  const n = nums.length;
  const used = new Uint8Array(n);
  const cur = [];

  function backtrack() {
    if (cur.length === n) {
      res.push([...cur]);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      used[i] = 1;
      cur.push(nums[i]);
      backtrack();
      cur.pop();
      used[i] = 0;
    }
  }

  backtrack();
  return res;
};

var solve = permute;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
