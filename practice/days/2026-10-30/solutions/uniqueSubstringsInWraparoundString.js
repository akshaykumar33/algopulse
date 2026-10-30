var findSubstringInWraproundString = function(s) {
  const maxLen = new Int32Array(26);
  let curLen = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = s.charCodeAt(i) - 97;
    if (i > 0 && (cur - (s.charCodeAt(i - 1) - 97) + 26) % 26 === 1) {
      curLen++;
    } else {
      curLen = 1;
    }
    if (curLen > maxLen[cur]) maxLen[cur] = curLen;
  }
  let sum = 0;
  for (let i = 0; i < 26; i++) sum += maxLen[i];
  return sum;
};

var solve = function(s) {
  return findSubstringInWraproundString(s);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
