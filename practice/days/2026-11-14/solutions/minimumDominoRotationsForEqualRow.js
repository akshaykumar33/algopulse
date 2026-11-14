var minDominoRotations = function(tops, bottoms) {
  const n = tops.length;

  function check(x) {
    let rotT = 0, rotB = 0;
    for (let i = 0; i < n; i++) {
      if (tops[i] !== x && bottoms[i] !== x) return -1;
      if (tops[i] !== x) rotT++;
      if (bottoms[i] !== x) rotB++;
    }
    return Math.min(rotT, rotB);
  }

  const res1 = check(tops[0]);
  if (res1 !== -1) return res1;
  return check(bottoms[0]);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(minDominoRotations(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = minDominoRotations;
