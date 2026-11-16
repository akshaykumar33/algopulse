var minimalKSum = function(nums, k) {
  nums.sort((a, b) => a - b);
  let ans = (BigInt(k) * BigInt(k + 1)) / 2n;
  let curThreshold = BigInt(k);

  let prev = -1;
  for (let i = 0; i < nums.length; i++) {
    const x = BigInt(nums[i]);
    if (x === BigInt(prev)) continue;
    prev = nums[i];

    if (x <= curThreshold) {
      curThreshold++;
      ans += curThreshold - x;
    }
  }
  return Number(ans);
};

var solve = minimalKSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
