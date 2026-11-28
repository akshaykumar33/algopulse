var minSplitMerge = function(nums1, nums2) {
  const n = nums1.length;
  const target = nums2.join(',');
  const seen = new Set([nums1.join(',')]);
  let q = [nums1];
  let d = 0;
  while (q.length) {
    const nq = [];
    for (const a of q) {
      if (a.join(',') === target) return d;
      for (let l = 0; l < n; l++) {
        for (let r = l; r < n; r++) {
          const mid = a.slice(l, r + 1);
          const rest = a.slice(0, l).concat(a.slice(r + 1));
          for (let p = 0; p <= rest.length; p++) {
            const b = rest.slice(0, p).concat(mid, rest.slice(p));
            const key = b.join(',');
            if (!seen.has(key)) { seen.add(key); nq.push(b); }
          }
        }
      }
    }
    q = nq;
    d++;
  }
  return -1;
};
var solve = minSplitMerge;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minSplitMerge;
