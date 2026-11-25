var partitionArray = function(nums, k) {
  const n = nums.length;
  if (n % k !== 0) return false;
  const g = n / k;
  const freq = new Map();
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    const c = (freq.get(x) || 0) + 1;
    if (c > g) return false;
    freq.set(x, c);
  }
  return true;
};

var solve = partitionArray;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const nums = JSON.parse(lines[i]);
      const k = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(partitionArray(nums, k)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = partitionArray;
