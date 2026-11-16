function gcd(a, b) {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

var minOperations = function(nums) {
  const n = nums.length;
  let ones = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) ones++;
  }
  if (ones > 0) return n - ones;

  let minLen = Infinity;
  for (let i = 0; i < n; i++) {
    let g = nums[i];
    for (let j = i; j < n; j++) {
      g = gcd(g, nums[j]);
      if (g === 1) {
        if (j - i + 1 < minLen) minLen = j - i + 1;
        break;
      }
    }
  }

  if (minLen === Infinity) return -1;
  return (minLen - 1) + (n - 1);
};

var solve = minOperations;

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
