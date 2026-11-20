var largestSquareArea = function(bottomLeft, topRight) {
  const n = bottomLeft.length;
  let maxSide = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const x1 = Math.max(bottomLeft[i][0], bottomLeft[j][0]);
      const y1 = Math.max(bottomLeft[i][1], bottomLeft[j][1]);
      const x2 = Math.min(topRight[i][0], topRight[j][0]);
      const y2 = Math.min(topRight[i][1], topRight[j][1]);
      const w = x2 - x1;
      const h = y2 - y1;
      const side = Math.min(w, h);
      if (side > maxSide) {
        maxSide = side;
      }
    }
  }
  return maxSide * maxSide;
};

var solve = largestSquareArea;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = largestSquareArea;