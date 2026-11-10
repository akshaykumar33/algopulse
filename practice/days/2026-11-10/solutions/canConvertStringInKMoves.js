var canConvertString = function(s, t, k) {
  if (s.length !== t.length) return false;
  const cnt = new Int32Array(26);
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const diff = (t.charCodeAt(i) - s.charCodeAt(i) + 26) % 26;
    if (diff > 0) {
      const needed = diff + cnt[diff] * 26;
      if (needed > k) return false;
      cnt[diff]++;
    }
  }
  return true;
};

var solve = canConvertString;

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
