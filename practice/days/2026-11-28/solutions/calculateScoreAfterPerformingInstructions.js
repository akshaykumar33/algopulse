var calculateScore = function(instructions, values) {
  const n = instructions.length;
  const vis = new Uint8Array(n);
  let i = 0, ans = 0;
  while (i >= 0 && i < n && !vis[i]) {
    vis[i] = 1;
    if (instructions[i] === 'add') { ans += values[i]; i++; }
    else i += values[i];
  }
  return ans;
};
var solve = calculateScore;
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
module.exports = calculateScore;
