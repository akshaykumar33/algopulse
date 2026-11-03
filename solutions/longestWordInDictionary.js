var longestWord = function(words) {
    words.sort((a, b) => a.length === b.length ? a.localeCompare(b) : a.length - b.length);
    let set = new Set();
    let ans = "";
    for (let word of words) {
        if (word.length === 1 || set.has(word.slice(0, -1))) {
            set.add(word);
            if (word.length > ans.length || (word.length === ans.length && word.localeCompare(ans) < 0)) {
                ans = word;
            }
        }
    }
    return ans;
};
var solve = longestWord;

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
