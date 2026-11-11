var destroyTargets = function(nums, space) {
  const n = nums.length;
  let cap = 16;
  while (cap < n * 2) cap <<= 1;
  const mask = cap - 1;
  const keys = new Int32Array(cap).fill(-1);
  const cnt = new Int32Array(cap);
  const minVal = new Int32Array(cap);

  for (let i = 0; i < n; i++) {
    const v = nums[i];
    const r = v % space;
    let h = Math.imul(r ^ (r >>> 16), 0x45d9f3b) & mask;
    while (keys[h] !== -1 && keys[h] !== r) {
      h = (h + 1) & mask;
    }
    if (keys[h] === -1) {
      keys[h] = r;
      cnt[h] = 1;
      minVal[h] = v;
    } else {
      cnt[h]++;
      if (v < minVal[h]) minVal[h] = v;
    }
  }

  let bestCnt = 0;
  let ans = 2e9;
  for (let h = 0; h < cap; h++) {
    const c = cnt[h];
    if (c > 0) {
      const mv = minVal[h];
      if (c > bestCnt || (c === bestCnt && mv < ans)) {
        bestCnt = c;
        ans = mv;
      }
    }
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    const isPacked = parsed.every((p) => Array.isArray(p) && p.length === 2 && Array.isArray(p[0]));
    if (parsed.length === 2 && !isPacked) {
      console.log(JSON.stringify(destroyTargets(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(destroyTargets(...p)));
      }
    }
  }
}

module.exports = destroyTargets;
