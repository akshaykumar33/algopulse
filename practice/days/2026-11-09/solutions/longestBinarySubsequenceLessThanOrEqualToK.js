var longestSubsequence = function(s, k) {
  let val = 0;
  let power = 1;
  let ans = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '0') {
      ans++;
      if (power <= k) {
        power *= 2;
      }
    } else {
      if (power <= k && val + power <= k) {
        val += power;
        ans++;
        power *= 2;
      }
    }
  }
  return ans;
};

var solve = longestSubsequence;

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
  } catch (err) {}
}

module.exports = solve;
