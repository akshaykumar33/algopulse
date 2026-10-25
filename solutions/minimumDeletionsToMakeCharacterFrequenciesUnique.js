var minDeletions = function(s) {
  const cnt = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    cnt[s.charCodeAt(i) - 97]++;
  }
  cnt.sort((a, b) => b - a);
  let ans = 0;
  const seen = new Set();
  for (let i = 0; i < 26; i++) {
    let f = cnt[i];
    if (f === 0) break;
    while (f > 0 && seen.has(f)) {
      f--;
      ans++;
    }
    if (f > 0) {
      seen.add(f);
    }
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
          const result = Array.isArray(parsed) && minDeletions.length > 1 ? minDeletions(...parsed) : minDeletions(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(minDeletions(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = minDeletions;
