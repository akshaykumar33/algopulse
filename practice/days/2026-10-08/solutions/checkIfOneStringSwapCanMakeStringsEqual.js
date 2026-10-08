var areAlmostEqual = function(s1, s2) {
  let diff = [];
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diff.push(i);
    }
  }
  if (diff.length === 0) return true;
  if (diff.length === 2) {
    let [i, j] = diff;
    return s1[i] === s2[j] && s1[j] === s2[i];
  }
  return false;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && areAlmostEqual.length > 1 ? areAlmostEqual(...parsed) : areAlmostEqual(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(areAlmostEqual(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = areAlmostEqual;
