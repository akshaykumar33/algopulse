var minCost = function(s, cost) {
  let totalCost = 0;
  for (const c of cost) totalCost += c;
  const charCost = new Float64Array(26);
  for (let i = 0; i < s.length; i++) {
    charCost[s.charCodeAt(i) - 97] += cost[i];
  }
  let maxSaved = 0;
  for (let i = 0; i < 26; i++) {
    if (charCost[i] > maxSaved) maxSaved = charCost[i];
  }
  return totalCost - maxSaved;
};
var solve = minCost;
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
module.exports = minCost;
