var countRectangles = function(rectangles, points) {
  const byH = Array.from({ length: 101 }, () => []);
  for (let i = 0; i < rectangles.length; i++) {
    byH[rectangles[i][1]].push(rectangles[i][0]);
  }
  for (let h = 1; h <= 100; h++) {
    byH[h].sort((a, b) => a - b);
  }

  const ans = new Array(points.length);
  for (let i = 0; i < points.length; i++) {
    const x = points[i][0];
    const y = points[i][1];
    let count = 0;
    for (let h = y; h <= 100; h++) {
      const arr = byH[h];
      if (arr.length === 0) continue;
      let l = 0;
      let r = arr.length - 1;
      let best = arr.length;
      while (l <= r) {
        const mid = (l + r) >> 1;
        if (arr[mid] >= x) {
          best = mid;
          r = mid - 1;
        } else {
          l = mid + 1;
        }
      }
      count += arr.length - best;
    }
    ans[i] = count;
  }

  return ans;
};

var solve = countRectangles;

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

module.exports = countRectangles;
