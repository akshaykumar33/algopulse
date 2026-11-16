var maxStrength = function(nums) {
  if (nums.length === 1) return nums[0];
  const pos = [];
  const neg = [];
  let zeros = 0;

  for (const x of nums) {
    if (x > 0) pos.push(BigInt(x));
    else if (x < 0) neg.push(BigInt(x));
    else zeros++;
  }

  neg.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  if (neg.length % 2 === 1) {
    neg.pop();
  }

  if (pos.length === 0 && neg.length === 0) {
    return 0;
  }

  let prod = 1n;
  for (const x of pos) prod *= x;
  for (const x of neg) prod *= x;
  return Number(prod);
};

var solve = maxStrength;

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
