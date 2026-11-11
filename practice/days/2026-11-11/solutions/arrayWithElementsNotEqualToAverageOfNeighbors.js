var rearrangeArray = function(nums) {
  const n = nums.length;
  const sorted = Int32Array.from(nums).sort();
  const res = new Array(n);
  const mid = (n + 1) >> 1;
  let idx = 0;
  for (let i = 0; i < mid; i++) {
    res[idx] = sorted[i];
    idx += 2;
  }
  idx = 1;
  for (let i = mid; i < n; i++) {
    res[idx] = sorted[i];
    idx += 2;
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (const line of lines) {
      console.log(JSON.stringify(rearrangeArray(JSON.parse(line))));
    }
  }
}

module.exports = rearrangeArray;
