var minLengthAfterRemovals = function(s) {
  let a = 0;
  for (let i = 0; i < s.length; i++) if (s[i] === 'a') a++;
  return Math.abs(2 * a - s.length);
};
var solve = minLengthAfterRemovals;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minLengthAfterRemovals;
