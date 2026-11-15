var waysToSplit = function(nums) {
  const n = nums.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + nums[i];

  const MOD = 1000000007;
  let ans = 0;
  const total = pref[n];

  for (let i = 1; i <= n - 2; i++) {
    const left = pref[i];
    if (3 * left > total) break;

    let low = i + 1, high = n - 1;
    let minJ = -1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (pref[mid] - left >= left) {
        minJ = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    if (minJ === -1) continue;

    low = minJ;
    high = n - 1;
    let maxJ = -1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (total - pref[mid] >= pref[mid] - left) {
        maxJ = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (maxJ !== -1 && maxJ >= minJ) {
      ans = (ans + (maxJ - minJ + 1)) % MOD;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i++) {
      console.log(JSON.stringify(waysToSplit(JSON.parse(lines[i]))));
    }
  }
}

module.exports = waysToSplit;
