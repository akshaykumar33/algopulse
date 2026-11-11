var beautifulSubsets = function(nums, k) {
  const groups = new Map();
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i];
    const r = v % k;
    let freq = groups.get(r);
    if (!freq) {
      freq = new Map();
      groups.set(r, freq);
    }
    freq.set(v, (freq.get(v) || 0) + 1);
  }

  let ans = 1;
  for (const freq of groups.values()) {
    const vals = Array.from(freq.keys()).sort((a, b) => a - b);
    let take = 0;
    let skip = 1;
    let prev = -1;
    for (let i = 0; i < vals.length; i++) {
      const v = vals[i];
      const ways = (1 << freq.get(v)) - 1;
      const nextSkip = skip + take;
      const nextTake = i > 0 && v - prev === k ? skip * ways : (skip + take) * ways;
      skip = nextSkip;
      take = nextTake;
      prev = v;
    }
    ans *= skip + take;
  }
  return ans - 1;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 2 && Array.isArray(p[0]));
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(beautifulSubsets(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(beautifulSubsets(...p)));
      }
    }
  }
}

module.exports = beautifulSubsets;
