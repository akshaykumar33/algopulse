var numberOfPairs = function(points) {
  points.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]));
  let ans = 0;

  for (let i = 0; i < points.length; i++) {
    let maxY = -Infinity;
    for (let j = i + 1; j < points.length; j++) {
      if (points[j][1] <= points[i][1]) {
        if (points[j][1] > maxY) {
          ans++;
          maxY = points[j][1];
        }
      }
    }
  }

  return ans;
};

var solve = numberOfPairs;

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

module.exports = numberOfPairs;
