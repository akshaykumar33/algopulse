var minimumSize = function(nums, maxOperations) {
  let lo = 1;
  let hi = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > hi) hi = nums[i];
  }
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    let ops = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > mid) {
        ops += Math.floor((nums[i] - 1) / mid);
        if (ops > maxOperations) break;
      }
    }
    if (ops <= maxOperations) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === minimumSize.length && !(Array.isArray(parsed[0]) && parsed[0].length === minimumSize.length && parsed.every((p) => Array.isArray(p) && p.length === minimumSize.length))) {
      console.log(JSON.stringify(minimumSize(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(minimumSize(...p)));
      }
    }
  }
}

module.exports = minimumSize;
