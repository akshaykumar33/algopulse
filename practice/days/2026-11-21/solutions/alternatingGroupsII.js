var numberOfAlternatingGroups = function(colors, k) {
  const n = colors.length;
  let ans = 0, count = 1;
  for (let i = 1; i < n + k - 1; i++) {
    const cur = colors[i % n];
    const prev = colors[(i - 1) % n];
    if (cur !== prev) count++;
    else count = 1;
    if (count >= k) ans++;
  }
  return ans;
};

var solve = numberOfAlternatingGroups;

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

module.exports = numberOfAlternatingGroups;