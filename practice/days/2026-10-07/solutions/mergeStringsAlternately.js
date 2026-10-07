var solve = function(word1, word2) {
    let n = word1.length;
    let m = word2.length;
    let i = 0;
    let j = 0;
    let res = [];
    while (i < n || j < m) {
        if (i < n) {
            res.push(word1[i++]);
        }
        if (j < m) {
            res.push(word2[j++]);
        }
    }
    return res.join('');
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
