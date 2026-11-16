var maxResult = function(nums, k) {
  const n = nums.length;
  const dp = new Int32Array(n);
  dp[0] = nums[0];
  const q = [0];

  for (let i = 1; i < n; i++) {
    while (q.length > 0 && q[0] < i - k) {
      q.shift();
    }
    dp[i] = nums[i] + dp[q[0]];
    while (q.length > 0 && dp[q[q.length - 1]] <= dp[i]) {
      q.pop();
    }
    q.push(i);
  }
  return dp[n - 1];
};

var solve = maxResult;

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
