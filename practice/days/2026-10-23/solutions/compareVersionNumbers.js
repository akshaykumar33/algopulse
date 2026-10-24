var compareVersion = function(version1, version2) {
  const v1 = version1.split('.');
  const v2 = version2.split('.');
  const len = Math.max(v1.length, v2.length);

  for (let i = 0; i < len; i++) {
    const r1 = i < v1.length ? parseInt(v1[i], 10) : 0;
    const r2 = i < v2.length ? parseInt(v2[i], 10) : 0;
    if (r1 < r2) return -1;
    if (r1 > r2) return 1;
  }

  return 0;
};

var solve = compareVersion;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const v1 = JSON.parse(lines[i]);
        const v2 = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(v1, v2)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
