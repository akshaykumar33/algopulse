var longestPalindrome = function(s) {
    const cnt = new Map();
    for (const ch of s) {
        cnt.set(ch, (cnt.get(ch) || 0) + 1);
    }
    let ans = 0;
    let odd = false;
    for (const [ch, freq] of cnt) {
        if (freq % 2 === 0) {
            ans += freq;
        } else {
            ans += freq - 1;
            odd = true;
        }
    }
    if (odd) {
        ans += 1;
    }
    return ans;
};

var solve = longestPalindrome;

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
