var minSensors = function(n, m, k) {
  const s = 2 * k + 1;
  return Math.ceil(n / s) * Math.ceil(m / s);
};
var solve = minSensors;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minSensors;
