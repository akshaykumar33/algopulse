var countBadPairs = function(nums) {
  const n = nums.length;
  const freq = new Map();
  let good = 0;
  for (let i = 0; i < n; i++) {
    const key = nums[i] - i;
    const cnt = freq.get(key) || 0;
    good += cnt;
    freq.set(key, cnt + 1);
  }
  return (n * (n - 1)) / 2 - good;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(countBadPairs(JSON.parse(line))));
    }
  }
}
