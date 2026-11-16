var minimumSeconds = function(nums) {
  const n = nums.length;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    const v = nums[i];
    if (!map.has(v)) map.set(v, []);
    map.get(v).push(i);
  }

  let minSec = n;
  for (const indices of map.values()) {
    let maxDist = 0;
    const m = indices.length;
    for (let i = 0; i < m; i++) {
      const nxt = (i + 1) % m;
      let dist = (indices[nxt] - indices[i] + n) % n;
      if (dist === 0) dist = n;
      if (dist > maxDist) maxDist = dist;
    }
    const sec = Math.floor(maxDist / 2);
    if (sec < minSec) minSec = sec;
  }
  return minSec;
};

var solve = minimumSeconds;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
