var letterCasePermutation = function(s) {
  const res = [];
  function backtrack(idx, cur) {
    if (idx === s.length) {
      res.push(cur);
      return;
    }
    const c = s[idx];
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
      backtrack(idx + 1, cur + c.toLowerCase());
      backtrack(idx + 1, cur + c.toUpperCase());
    } else {
      backtrack(idx + 1, cur + c);
    }
  }
  backtrack(0, '');
  return res;
};

var solve = letterCasePermutation;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const s = JSON.parse(lines[i]);
        const result = solve(s);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = letterCasePermutation;
