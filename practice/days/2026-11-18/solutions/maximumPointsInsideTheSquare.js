var maxPointsInsideSquare = function(points, s) {
  const n = points.length;
  const dists = [];

  for (let i = 0; i < n; i++) {
    const d = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));
    const charCode = s.charCodeAt(i) - 97;
    dists.push({ d, charCode });
  }

  dists.sort((a, b) => a.d - b.d);

  const minDForColor = new Array(26).fill(Infinity);
  const secondMinDForColor = new Array(26).fill(Infinity);

  for (const { d, charCode } of dists) {
    if (d < minDForColor[charCode]) {
      secondMinDForColor[charCode] = minDForColor[charCode];
      minDForColor[charCode] = d;
    } else if (d < secondMinDForColor[charCode]) {
      secondMinDForColor[charCode] = d;
    }
  }

  let maxR = Infinity;
  for (let i = 0; i < 26; i++) {
    if (secondMinDForColor[i] !== Infinity) {
      maxR = Math.min(maxR, secondMinDForColor[i] - 1);
    }
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const d = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));
    if (d <= maxR) {
      ans++;
    }
  }

  return ans;
};

var solve = maxPointsInsideSquare;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maxPointsInsideSquare;
