var longestSubstring = function(s, k) {
  if (s.length === 0 || s.length < k) return 0;
  let freq = new Map();
  for (let i = 0; i < s.length; i++) {
    freq.set(s[i], (freq.get(s[i]) || 0) + 1);
  }
  let mid = '';
  for (let [char, count] of freq.entries()) {
    if (count < k) {
      mid = char;
      break;
    }
  }
  if (mid === '') return s.length;
  let parts = s.split(mid);
  let ans = 0;
  for (let p of parts) {
    ans = Math.max(ans, longestSubstring(p, k));
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && longestSubstring.length > 1 ? longestSubstring(...parsed) : longestSubstring(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(longestSubstring(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = longestSubstring;
