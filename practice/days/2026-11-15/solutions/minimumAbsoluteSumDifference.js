var minAbsoluteSumDiff = function(nums1, nums2) {
  const n = nums1.length;
  const MOD = 1000000007n;
  const sorted = [...nums1].sort((a, b) => a - b);

  let totalDiff = 0n;
  for (let i = 0; i < n; i++) {
    totalDiff += BigInt(Math.abs(nums1[i] - nums2[i]));
  }

  let maxSaving = 0;
  for (let i = 0; i < n; i++) {
    const original = Math.abs(nums1[i] - nums2[i]);
    const target = nums2[i];

    let low = 0, high = n - 1;
    let best = Infinity;
    while (low <= high) {
      const mid = (low + high) >> 1;
      const d = Math.abs(sorted[mid] - target);
      if (d < best) best = d;
      if (sorted[mid] < target) low = mid + 1;
      else high = mid - 1;
    }

    const saving = original - best;
    if (saving > maxSaving) maxSaving = saving;
  }

  const ans = (totalDiff - BigInt(maxSaving)) % MOD;
  return Number(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(minAbsoluteSumDiff(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = minAbsoluteSumDiff;
