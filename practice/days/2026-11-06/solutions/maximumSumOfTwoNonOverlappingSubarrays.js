var maxSumTwoNoOverlap = function(nums, firstLen, secondLen) {
  const n = nums.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }

  function helper(len1, len2) {
    let max1 = 0;
    let ans = 0;
    for (let i = len1 + len2; i <= n; i++) {
      const cur1 = pref[i - len2] - pref[i - len2 - len1];
      if (cur1 > max1) max1 = cur1;
      const cur2 = pref[i] - pref[i - len2];
      if (max1 + cur2 > ans) ans = max1 + cur2;
    }
    return ans;
  }

  return Math.max(helper(firstLen, secondLen), helper(secondLen, firstLen));
};

var solve = typeof maxSumTwoNoOverlap !== 'undefined' ? maxSumTwoNoOverlap : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        const nums = JSON.parse(lines[i]);
        const firstLen = JSON.parse(lines[i + 1]);
        const secondLen = JSON.parse(lines[i + 2]);
        console.log(JSON.stringify(solve(nums, firstLen, secondLen)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

