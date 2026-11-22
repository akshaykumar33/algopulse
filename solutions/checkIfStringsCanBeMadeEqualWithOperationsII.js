var checkStrings = function(s1, s2) {
  const even1 = new Int32Array(26), even2 = new Int32Array(26);
  const odd1 = new Int32Array(26), odd2 = new Int32Array(26);
  for (let i = 0; i < s1.length; i++) {
    if (i % 2 === 0) {
      even1[s1.charCodeAt(i) - 97]++;
      even2[s2.charCodeAt(i) - 97]++;
    } else {
      odd1[s1.charCodeAt(i) - 97]++;
      odd2[s2.charCodeAt(i) - 97]++;
    }
  }
  for (let i = 0; i < 26; i++) {
    if (even1[i] !== even2[i] || odd1[i] !== odd2[i]) return false;
  }
  return true;
};
var solve = checkStrings;
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
module.exports = checkStrings;