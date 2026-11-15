var maxAbsValExpr = function(arr1, arr2) {
  const n = arr1.length;
  let ans = 0;
  const signs = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];

  for (const [s1, s2] of signs) {
    let minV = Infinity;
    let maxV = -Infinity;
    for (let i = 0; i < n; i++) {
      const v = s1 * arr1[i] + s2 * arr2[i] + i;
      if (v < minV) minV = v;
      if (v > maxV) maxV = v;
    }
    const diff = maxV - minV;
    if (diff > ans) ans = diff;
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(maxAbsValExpr(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = maxAbsValExpr;
