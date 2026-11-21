var minDeletion = function(nums) {
  let del = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if ((i - del) % 2 === 0 && i + 1 < n && nums[i] === nums[i + 1]) {
      del++;
    }
  }
  if ((n - del) % 2 === 1) del++;
  return del;
};

var solve = minDeletion;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minDeletion;