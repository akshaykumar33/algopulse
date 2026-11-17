var isPossibleDivide = function(nums, k) {
  if (nums.length % k !== 0) return false;
  nums.sort((a, b) => a - b);

  const cnt = new Map();
  for (let i = 0; i < nums.length; i++) {
    cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
  }

  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    const c = cnt.get(v) || 0;
    if (c === 0) continue;

    for (let j = 0; j < k; j++) {
      const cur = v + j;
      const count = cnt.get(cur) || 0;
      if (count < c) return false;
      cnt.set(cur, count - c);
    }
  }

  return true;
};

var solve = isPossibleDivide;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
