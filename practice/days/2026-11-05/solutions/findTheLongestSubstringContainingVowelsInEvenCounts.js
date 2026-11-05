var findTheLongestSubstringContainingVowelsInEvenCounts = function(s) {
    let mask = 0, ans = 0;
    const map = new Map();
    map.set(0, -1);
    const vowels = { 'a': 1, 'e': 2, 'i': 4, 'o': 8, 'u': 16 };
    for (let i = 0; i < s.length; i++) {
        if (vowels[s[i]] !== undefined) {
            mask ^= vowels[s[i]];
        }
        if (map.has(mask)) {
            ans = Math.max(ans, i - map.get(mask));
        } else {
            map.set(mask, i);
        }
    }
    return ans;
};
var solve = findTheLongestSubstringContainingVowelsInEvenCounts;

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
