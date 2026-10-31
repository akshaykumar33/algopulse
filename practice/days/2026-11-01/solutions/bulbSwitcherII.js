var flipLights = function(n, presses) {
    if (presses === 0) return 1;
    if (n === 1) return 2;
    if (n === 2) return presses === 1 ? 3 : 4;
    if (presses === 1) return 4;
    if (presses === 2) return 7;
    return 8;
};
var solve = typeof flipLights !== 'undefined' ? flipLights : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const n = JSON.parse(lines[i]);
        const presses = JSON.parse(lines[i+1]);
        console.log(JSON.stringify(solve(n, presses)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
