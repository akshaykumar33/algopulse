var findAndReplacePattern = function(words, pattern) {
  function match(w, p) {
    if (w.length !== p.length) return false;
    const m1 = new Map();
    const m2 = new Map();
    for (let i = 0; i < w.length; i++) {
      const c1 = w[i];
      const c2 = p[i];
      if (m1.has(c1) && m1.get(c1) !== c2) return false;
      if (m2.has(c2) && m2.get(c2) !== c1) return false;
      m1.set(c1, c2);
      m2.set(c2, c1);
    }
    return true;
  }

  const ans = [];
  for (let i = 0; i < words.length; i++) {
    if (match(words[i], pattern)) ans.push(words[i]);
  }
  return ans;
};

var solve = typeof findAndReplacePattern !== 'undefined' ? findAndReplacePattern : null;

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
