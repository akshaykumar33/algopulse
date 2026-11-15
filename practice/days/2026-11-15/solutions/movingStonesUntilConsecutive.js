var numMovesStones = function(a, b, c) {
  const arr = [a, b, c].sort((x, y) => x - y);
  const [x, y, z] = arr;
  const maxMoves = (z - y - 1) + (y - x - 1);
  let minMoves = 2;
  if (z - x === 2) minMoves = 0;
  else if (y - x <= 2 || z - y <= 2) minMoves = 1;
  return [minMoves, maxMoves];
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 3) {
      console.log(JSON.stringify(numMovesStones(JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]))));
    }
  }
}

module.exports = numMovesStones;
