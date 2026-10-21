var lengthOfLongestSubstring = function(s) {
  let map = new Map();
  let left = 0;
  let ans = 0;
  for (let right = 0; right < s.length; right++) {
    let c = s[right];
    if (map.has(c) && map.get(c) >= left) {
      left = map.get(c) + 1;
    }
    map.set(c, right);
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};

var solve = lengthOfLongestSubstring;

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
