var minSumSquareDiff = function(nums1, nums2, k1, k2) {
  const n = nums1.length;
  let maxD = 0;
  let sumD = 0;
  for (let i = 0; i < n; i++) {
    const d = Math.abs(nums1[i] - nums2[i]);
    if (d > maxD) maxD = d;
    sumD += d;
  }
  let k = k1 + k2;
  if (k >= sumD) return 0;

  const freq = new Int32Array(maxD + 1);
  for (let i = 0; i < n; i++) {
    freq[Math.abs(nums1[i] - nums2[i])]++;
  }

  for (let d = maxD; d > 0 && k > 0; d--) {
    const c = freq[d];
    if (c === 0) continue;
    if (k >= c) {
      freq[d - 1] += c;
      freq[d] = 0;
      k -= c;
    } else {
      freq[d] -= k;
      freq[d - 1] += k;
      k = 0;
    }
  }

  let ans = 0;
  for (let d = 1; d <= maxD; d++) {
    if (freq[d] > 0) {
      ans += freq[d] * d * d;
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 4 && Array.isArray(p[0]));
    if (parsed.length === 4 && !isPacked) {
      console.log(JSON.stringify(minSumSquareDiff(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(minSumSquareDiff(...p)));
      }
    }
  }
}

module.exports = minSumSquareDiff;
