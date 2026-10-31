var findNumberOfLIS = function(nums) {
    let n = nums.length;
    if (n <= 1) return n;
    let len = new Array(n).fill(1);
    let cnt = new Array(n).fill(1);
    let maxLen = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (len[j] + 1 > len[i]) {
                    len[i] = len[j] + 1;
                    cnt[i] = cnt[j];
                } else if (len[j] + 1 === len[i]) {
                    cnt[i] += cnt[j];
                }
            }
        }
        maxLen = Math.max(maxLen, len[i]);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (len[i] === maxLen) {
            ans += cnt[i];
        }
    }
    return ans;
};
var numberOfLongestIncreasingSubsequence = findNumberOfLIS;
var solve = findNumberOfLIS;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed)));
    }
  }
}
module.exports = solve;
