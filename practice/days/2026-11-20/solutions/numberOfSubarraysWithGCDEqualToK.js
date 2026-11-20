function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

var subarrayGCD = function(nums, k) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let g = 0;
    for (let j = i; j < nums.length; j++) {
      g = gcd(g, nums[j]);
      if (g < k) break;
      if (g === k) ans++;
    }
  }
  return ans;
};

var solve = subarrayGCD;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = subarrayGCD;