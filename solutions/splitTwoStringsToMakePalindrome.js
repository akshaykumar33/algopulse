var splitTwoStringsToMakePalindrome = function(a, b) {
  function isPalin(s, l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  function check(s1, s2) {
    let l = 0;
    let r = s1.length - 1;
    while (l < r && s1[l] === s2[r]) {
      l++;
      r--;
    }
    if (l >= r) return true;
    return isPalin(s1, l, r) || isPalin(s2, l, r);
  }

  return check(a, b) || check(b, a);
};

var solve = typeof splitTwoStringsToMakePalindrome !== 'undefined' ? splitTwoStringsToMakePalindrome : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

