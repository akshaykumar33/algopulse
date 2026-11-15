var arrayChange = function(nums, operations) {
  const pos = new Map();
  for (let i = 0; i < nums.length; i++) {
    pos.set(nums[i], i);
  }

  for (let i = 0; i < operations.length; i++) {
    const [u, v] = operations[i];
    const idx = pos.get(u);
    nums[idx] = v;
    pos.delete(u);
    pos.set(v, idx);
  }

  return nums;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(arrayChange(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = arrayChange;
