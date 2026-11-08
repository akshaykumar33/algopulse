var filterRestaurants = function(restaurants, veganFriendly, maxPrice, maxDistance) {
  const filtered = [];
  for (let i = 0; i < restaurants.length; i++) {
    const r = restaurants[i];
    if (veganFriendly === 1 && r[2] !== 1) continue;
    if (r[3] > maxPrice) continue;
    if (r[4] > maxDistance) continue;
    filtered.push(r);
  }
  filtered.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0] - a[0];
  });
  const ans = new Array(filtered.length);
  for (let i = 0; i < filtered.length; i++) {
    ans[i] = filtered[i][0];
  }
  return ans;
};

var solve = filterRestaurants;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
