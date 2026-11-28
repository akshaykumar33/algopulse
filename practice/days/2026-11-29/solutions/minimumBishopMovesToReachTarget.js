var minBishopMoves = function(source, target) {
  const [a, b] = source, [c, d] = target;
  if ((a + b) % 2 !== (c + d) % 2) return -1;
  if (a + b === c + d || a - b === c - d) return 1;
  return 2;
};
var solve = minBishopMoves;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = minBishopMoves;
