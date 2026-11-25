var maximumSum = function(nums) {
  const top = [[], [], []];
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const r = x % 3;
    const b = top[r];
    if (b.length < 3) {
      b.push(x);
      b.sort((p, q) => q - p);
    } else if (x > b[2]) {
      b[2] = x;
      b.sort((p, q) => q - p);
    }
  }
  let ans = 0;
  for (let r = 0; r < 3; r++) {
    if (top[r].length === 3) {
      const s = top[r][0] + top[r][1] + top[r][2];
      if (s > ans) ans = s;
    }
  }
  if (top[0].length > 0 && top[1].length > 0 && top[2].length > 0) {
    const s = top[0][0] + top[1][0] + top[2][0];
    if (s > ans) ans = s;
  }
  return ans;
};

var solve = maximumSum;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const nums = JSON.parse(lines[i]);
      out.push(JSON.stringify(maximumSum(nums)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = maximumSum;
