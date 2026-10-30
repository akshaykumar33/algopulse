var findRadius = function(houses, heaters) {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  let radius = 0;
  let j = 0;
  for (let i = 0; i < houses.length; i++) {
    while (j < heaters.length - 1 && Math.abs(heaters[j + 1] - houses[i]) <= Math.abs(heaters[j] - houses[i])) {
      j++;
    }
    radius = Math.max(radius, Math.abs(heaters[j] - houses[i]));
  }
  return radius;
};

var solve = function(houses, heaters) {
  return findRadius(houses, heaters);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const houses = JSON.parse(lines[0]);
      const heaters = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(houses, heaters)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
