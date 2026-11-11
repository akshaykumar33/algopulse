var maxKelements = function(nums, k) {
  const h = Int32Array.from(nums);
  const n = h.length;
  const siftDown = (idx) => {
    while (true) {
      const l = (idx << 1) + 1;
      if (l >= n) break;
      const r = l + 1;
      let best = l;
      if (r < n && h[r] > h[l]) best = r;
      if (h[best] <= h[idx]) break;
      const tmp = h[idx];
      h[idx] = h[best];
      h[best] = tmp;
      idx = best;
    }
  };
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    siftDown(i);
  }
  let ans = 0;
  for (let step = 0; step < k; step++) {
    const top = h[0];
    if (top === 1) {
      ans += k - step;
      break;
    }
    ans += top;
    h[0] = ((top + 2) / 3) | 0;
    siftDown(0);
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
      console.log(JSON.stringify(maxKelements(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(maxKelements(...p)));
      }
    }
  }
}

module.exports = maxKelements;
