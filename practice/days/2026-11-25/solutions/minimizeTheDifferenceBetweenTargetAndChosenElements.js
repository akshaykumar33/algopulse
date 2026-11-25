var minimizeTheDifference = function(mat, target) {
  const m = mat.length;
  let minSum = 0;
  for (let i = 0; i < m; i++) {
    let mn = mat[i][0];
    for (let j = 1; j < mat[i].length; j++) {
      if (mat[i][j] < mn) mn = mat[i][j];
    }
    minSum += mn;
  }
  if (minSum >= target) return minSum - target;
  let dp = 1n;
  for (let i = 0; i < m; i++) {
    const seen = new Uint8Array(71);
    let next = 0n;
    for (let j = 0; j < mat[i].length; j++) {
      const v = mat[i][j];
      if (!seen[v]) {
        seen[v] = 1;
        next |= dp << BigInt(v);
      }
    }
    dp = next;
  }
  const lim = 2 * target - minSum;
  for (let d = 0; d <= lim; d++) {
    if (target - d >= 0 && ((dp >> BigInt(target - d)) & 1n)) return d;
    if ((dp >> BigInt(target + d)) & 1n) return d;
  }
  return target - minSum;
};

var solve = minimizeTheDifference;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const mat = JSON.parse(lines[i]);
      const target = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(minimizeTheDifference(mat, target)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = minimizeTheDifference;
