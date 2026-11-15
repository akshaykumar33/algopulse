var minIncrements = function(n, cost) {
  let ans = 0;
  for (let i = Math.floor(n / 2); i >= 1; i--) {
    const l = cost[2 * i - 1];
    const r = cost[2 * i];
    ans += Math.abs(l - r);
    cost[i - 1] += Math.max(l, r);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(minIncrements(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = minIncrements;
