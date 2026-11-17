var countPoints = function(points, queries) {
  const ans = new Int32Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const qx = queries[i][0];
    const qy = queries[i][1];
    const qr2 = queries[i][2] * queries[i][2];
    let cnt = 0;
    for (let j = 0; j < points.length; j++) {
      const dx = points[j][0] - qx;
      const dy = points[j][1] - qy;
      if (dx * dx + dy * dy <= qr2) {
        cnt++;
      }
    }
    ans[i] = cnt;
  }
  return Array.from(ans);
};

var solve = countPoints;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
