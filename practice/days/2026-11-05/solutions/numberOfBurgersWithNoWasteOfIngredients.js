var numberOfBurgersWithNoWasteOfIngredients = function(tomatoSlices, cheeseSlices) {
    if (tomatoSlices % 2 !== 0) return [];
    let j = (tomatoSlices - 2 * cheeseSlices) / 2;
    let s = cheeseSlices - j;
    if (j >= 0 && s >= 0) return [j, s];
    return [];
};
var solve = numberOfBurgersWithNoWasteOfIngredients;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const tomatoSlices = JSON.parse(lines[i]);
        const cheeseSlices = JSON.parse(lines[i+1]);
        const result = solve(tomatoSlices, cheeseSlices);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
