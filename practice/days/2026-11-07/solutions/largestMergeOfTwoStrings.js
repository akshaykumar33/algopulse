var largestMerge = function(word1, word2) {
  let i = 0, j = 0;
  const ans = [];
  while (i < word1.length || j < word2.length) {
    if (i < word1.length && j < word2.length) {
      if (word1.slice(i) > word2.slice(j)) {
        ans.push(word1[i++]);
      } else {
        ans.push(word2[j++]);
      }
    } else if (i < word1.length) {
      ans.push(word1[i++]);
    } else {
      ans.push(word2[j++]);
    }
  }
  return ans.join('');
};

var solve = typeof largestMerge !== 'undefined' ? largestMerge : null;

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
module.exports = { largestMerge, solve };
