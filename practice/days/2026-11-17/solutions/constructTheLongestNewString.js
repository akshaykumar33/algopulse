var longestString = function(x, y, z) {
  if (x === y) {
    return (x + y + z) * 2;
  }
  return (2 * Math.min(x, y) + 1 + z) * 2;
};

var solve = longestString;

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
