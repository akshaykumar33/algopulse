var solve = function(words) {
  for (const s of words) {
    let l = 0, r = s.length - 1;
    let ok = true;
    while (l < r) {
      if (s[l] !== s[r]) {
        ok = false;
        break;
      }
      l++;
      r--;
    }
    if (ok) return s;
  }
  return "";
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
