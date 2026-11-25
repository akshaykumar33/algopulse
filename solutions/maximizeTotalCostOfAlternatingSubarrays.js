var maximumTotalCost = function(nums) {
  const n = nums.length;
  let pos = nums[0];
  let neg = -Infinity;
  for (let i = 1; i < n; i++) {
    const x = nums[i];
    const nPos = Math.max(pos, neg) + x;
    const nNeg = pos - x;
    pos = nPos;
    neg = nNeg;
  }
  return Math.max(pos, neg);
};

var solve = maximumTotalCost;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const nums = JSON.parse(lines[i]);
      out.push(JSON.stringify(maximumTotalCost(nums)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = maximumTotalCost;
