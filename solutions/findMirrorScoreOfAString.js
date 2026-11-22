var calculateScore = function(s) {
  const stacks = Array.from({ length: 26 }, () => []);
  let score = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i) - 97;
    const mirror = 25 - c;
    if (stacks[mirror].length > 0) {
      const j = stacks[mirror].pop();
      score += (i - j);
    } else {
      stacks[c].push(i);
    }
  }
  return score;
};
var solve = calculateScore;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = calculateScore;