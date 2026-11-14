var countDistinctIntegers = function(nums) {
  const set = new Set(nums);
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let rev = 0;
    while (x > 0) {
      rev = rev * 10 + (x % 10);
      x = Math.floor(x / 10);
    }
    set.add(rev);
  }
  return set.size;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(countDistinctIntegers(JSON.parse(l))));
  }
}

module.exports = countDistinctIntegers;
