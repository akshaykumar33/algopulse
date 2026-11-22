var countCoveredBuildings = function(n, buildings) {
  const minX = new Map(), maxX = new Map();
  const minY = new Map(), maxY = new Map();
  for (let i = 0; i < buildings.length; i++) {
    const [x, y] = buildings[i];
    if (!minX.has(y) || x < minX.get(y)) minX.set(y, x);
    if (!maxX.has(y) || x > maxX.get(y)) maxX.set(y, x);
    if (!minY.has(x) || y < minY.get(x)) minY.set(x, y);
    if (!maxY.has(x) || y > maxY.get(x)) maxY.set(x, y);
  }
  let ans = 0;
  for (let i = 0; i < buildings.length; i++) {
    const [x, y] = buildings[i];
    if (x > minX.get(y) && x < maxX.get(y) && y > minY.get(x) && y < maxY.get(x)) {
      ans++;
    }
  }
  return ans;
};
var solve = countCoveredBuildings;
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
module.exports = countCoveredBuildings;