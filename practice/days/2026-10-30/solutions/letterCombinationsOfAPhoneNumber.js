var letterCombinations = function(digits) {
  if (!digits || digits.length === 0) return [];
  const map = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };
  const res = [];
  function backtrack(idx, cur) {
    if (idx === digits.length) {
      res.push(cur);
      return;
    }
    const letters = map[digits[idx]];
    for (let i = 0; i < letters.length; i++) {
      backtrack(idx + 1, cur + letters[i]);
    }
  }
  backtrack(0, "");
  return res;
};

var solve = function(digits) {
  return letterCombinations(digits);
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
