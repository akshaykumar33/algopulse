var numberOfSpecialChars = function(s) {
  const lastLower = new Int32Array(26).fill(-1);
  const firstUpper = new Int32Array(26).fill(-1);

  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if (code >= 97 && code <= 122) {
      lastLower[code - 97] = i;
    } else if (code >= 65 && code <= 90) {
      const idx = code - 65;
      if (firstUpper[idx] === -1) firstUpper[idx] = i;
    }
  }

  let cnt = 0;
  for (let i = 0; i < 26; i++) {
    if (lastLower[i] !== -1 && firstUpper[i] !== -1 && lastLower[i] < firstUpper[i]) {
      cnt++;
    }
  }

  return cnt;
};

var solve = numberOfSpecialChars;

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

module.exports = numberOfSpecialChars;
