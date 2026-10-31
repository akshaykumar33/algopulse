var reverseWords = function(s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};
var reverseWordsInAString = reverseWords;
var solve = reverseWords;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(solve(parsed)));
    }
  }
}
module.exports = solve;
