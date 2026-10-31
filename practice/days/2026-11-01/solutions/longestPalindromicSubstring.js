var longestPalindrome = function(s) {
    if (!s || s.length < 2) return s;
    let start = 0, maxLen = 1;

    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }
        const len = r - l - 1;
        if (len > maxLen) {
            maxLen = len;
            start = l + 1;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }

    return s.substring(start, start + maxLen);
};

var solve = typeof longestPalindrome !== 'undefined' ? longestPalindrome : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;

