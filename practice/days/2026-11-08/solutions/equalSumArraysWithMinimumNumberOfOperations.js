var minOperations = function(nums1, nums2) {
  let n1 = nums1.length, n2 = nums2.length;
  if (n1 * 6 < n2 || n2 * 6 < n1) return -1;
  let sum1 = 0, sum2 = 0;
  for (let i = 0; i < n1; i++) sum1 += nums1[i];
  for (let i = 0; i < n2; i++) sum2 += nums2[i];
  if (sum1 < sum2) {
    let t = nums1;
    nums1 = nums2;
    nums2 = t;
    let ts = sum1;
    sum1 = sum2;
    sum2 = ts;
  }
  let diff = sum1 - sum2;
  if (diff === 0) return 0;
  const cnt = new Int32Array(6);
  for (let i = 0; i < nums1.length; i++) cnt[nums1[i] - 1]++;
  for (let i = 0; i < nums2.length; i++) cnt[6 - nums2[i]]++;
  let ans = 0;
  for (let g = 5; g >= 1; g--) {
    if (cnt[g] === 0) continue;
    let take = Math.min(cnt[g], Math.ceil(diff / g));
    diff -= take * g;
    ans += take;
    if (diff <= 0) break;
  }
  return ans;
};

var solve = minOperations;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
