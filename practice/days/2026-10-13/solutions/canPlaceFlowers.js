var solve = function(flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      let emptyLeft = (i === 0) || (flowerbed[i - 1] === 0);
      let emptyRight = (i === flowerbed.length - 1) || (flowerbed[i + 1] === 0);
      if (emptyLeft && emptyRight) {
        flowerbed[i] = 1;
        count++;
      }
    }
  }
  return count >= n;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const flowerbed = JSON.parse(lines[i]);
        const n = JSON.parse(lines[i + 1]);
        const result = solve(flowerbed, n);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
