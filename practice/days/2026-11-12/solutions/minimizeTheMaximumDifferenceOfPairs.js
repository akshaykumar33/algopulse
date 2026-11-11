var minimizeMax = function(nums, p) {
  if (p === 0) return 0;
  const arr = nums.slice().sort((a, b) => a - b);
  const n = arr.length;

  const can = (lim) => {
    let cnt = 0;
    let i = 0;
    while (i < n - 1) {
      if (arr[i + 1] - arr[i] <= lim) {
        cnt++;
        if (cnt >= p) return true;
        i += 2;
      } else {
        i++;
      }
    }
    return false;
  };

  let lo = 0;
  let hi = arr[n - 1] - arr[0];
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (can(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && typeof p[1] === 'number';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(minimizeMax(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(minimizeMax(...args)));
      }
    }
  }
}

module.exports = minimizeMax;
