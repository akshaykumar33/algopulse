var maximumCostSubstring = function(s, chars, vals) {
  const valMap = new Map();
  for (let i = 0; i < chars.length; i++) {
    valMap.set(chars[i], vals[i]);
  }
  let maxCost = 0;
  let cur = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const v = valMap.has(ch) ? valMap.get(ch) : (ch.charCodeAt(0) - 96);
    cur = Math.max(0, cur + v);
    maxCost = Math.max(maxCost, cur);
  }
  return maxCost;
};

var solve = maximumCostSubstring;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = maximumCostSubstring;