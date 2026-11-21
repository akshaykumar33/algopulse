var findSmallestInteger = function(nums, value) {
  const count = new Int32Array(value);
  for (let i = 0; i < nums.length; i++) {
    const rem = ((nums[i] % value) + value) % value;
    count[rem]++;
  }
  let ans = 0;
  while (true) {
    const rem = ans % value;
    if (count[rem] > 0) count[rem]--;
    else return ans;
    ans++;
  }
};

var solve = findSmallestInteger;

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

module.exports = findSmallestInteger;