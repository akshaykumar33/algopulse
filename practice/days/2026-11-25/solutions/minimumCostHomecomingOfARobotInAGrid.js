var minCost = function(startPos, homePos, rowCosts, colCosts) {
  let ans = 0;
  let r = startPos[0];
  let c = startPos[1];
  const hr = homePos[0];
  const hc = homePos[1];
  while (r < hr) ans += rowCosts[++r];
  while (r > hr) ans += rowCosts[--r];
  while (c < hc) ans += colCosts[++c];
  while (c > hc) ans += colCosts[--c];
  return ans;
};

var solve = minCost;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 3 < lines.length; i += 4) {
      const startPos = JSON.parse(lines[i]);
      const homePos = JSON.parse(lines[i + 1]);
      const rowCosts = JSON.parse(lines[i + 2]);
      const colCosts = JSON.parse(lines[i + 3]);
      out.push(JSON.stringify(minCost(startPos, homePos, rowCosts, colCosts)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = minCost;
