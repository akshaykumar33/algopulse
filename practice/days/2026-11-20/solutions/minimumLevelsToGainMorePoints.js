var minimumLevels = function(possible) {
  const n = possible.length;
  let total = 0;
  for (let i = 0; i < n; i++) total += possible[i] === 1 ? 1 : -1;
  let cur = 0;
  for (let i = 0; i < n - 1; i++) {
    cur += possible[i] === 1 ? 1 : -1;
    if (2 * cur > total) return i + 1;
  }
  return -1;
};

var solve = minimumLevels;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimumLevels;