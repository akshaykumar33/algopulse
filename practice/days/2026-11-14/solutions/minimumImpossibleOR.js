var minImpossibleOR = function(nums) {
  const set = new Set(nums);
  for (let i = 0; i < 31; i++) {
    const val = 1 << i;
    if (!set.has(val)) return val;
  }
  return 1 << 30;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(minImpossibleOR(JSON.parse(l))));
  }
}

module.exports = minImpossibleOR;
