var maxTotal = function(values) {
  values.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < values.length; i++) ans += values[i] * (i + 1);
  return ans;
};
var solve = maxTotal;
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
module.exports = maxTotal;
