var repeatedStringMatch = function(a, b) {
    let count = Math.ceil(b.length / a.length);
    let str = a.repeat(count);
    if (str.includes(b)) return count;
    if ((str + a).includes(b)) return count + 1;
    if ((str + a + a).includes(b)) return count + 2;
    return -1;
};
var solve = typeof repeatedStringMatch !== 'undefined' ? repeatedStringMatch : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const a = JSON.parse(lines[i]);
        const b = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(a, b)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
