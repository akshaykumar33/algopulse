var largestOverlap = function(img1, img2) {
  const n = img1.length;
  const r1 = [];
  const c1 = [];
  const r2 = [];
  const c2 = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (img1[i][j] === 1) {
        r1.push(i);
        c1.push(j);
      }
      if (img2[i][j] === 1) {
        r2.push(i);
        c2.push(j);
      }
    }
  }
  const stride = 2 * n;
  const cnt = new Int32Array(stride * stride);
  let ans = 0;
  for (let i = 0; i < r1.length; i++) {
    const ri = r1[i] + n;
    const ci = c1[i] + n;
    for (let j = 0; j < r2.length; j++) {
      const key = (ri - r2[j]) * stride + (ci - c2[j]);
      const v = ++cnt[key];
      if (v > ans) ans = v;
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
    if (parsed.length === largestOverlap.length && !(Array.isArray(parsed[0]) && parsed[0].length === largestOverlap.length && parsed.every((p) => Array.isArray(p) && p.length === largestOverlap.length))) {
      console.log(JSON.stringify(largestOverlap(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(largestOverlap(...p)));
      }
    }
  }
}

module.exports = largestOverlap;
