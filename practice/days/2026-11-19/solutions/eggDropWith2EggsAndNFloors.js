var twoEggDrop = function(n) {
  return Math.ceil((Math.sqrt(1 + 8 * n) - 1) / 2);
};

var solve = twoEggDrop;

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

module.exports = twoEggDrop;
