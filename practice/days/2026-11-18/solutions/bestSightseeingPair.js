var maxScoreSightseeingPair = function(values) {
  let ans = 0;
  let maxI = values[0];
  for (let j = 1; j < values.length; j++) {
    const cur = maxI + values[j] - j;
    if (cur > ans) ans = cur;
    if (values[j] + j > maxI) maxI = values[j] + j;
  }
  return ans;
};

var solve = maxScoreSightseeingPair;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maxScoreSightseeingPair;
