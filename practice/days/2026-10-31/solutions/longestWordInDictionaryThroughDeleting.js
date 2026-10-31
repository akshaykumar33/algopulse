var longestWordInDictionaryThroughDeleting = function(s, dictionary) {
    let ans = "";
    for (const word of dictionary) {
        let i = 0;
        let j = 0;
        while (i < s.length && j < word.length) {
            if (s[i] === word[j]) {
                j++;
            }
            i++;
        }
        if (j === word.length) {
            if (word.length > ans.length || (word.length === ans.length && word < ans)) {
                ans = word;
            }
        }
    }
    return ans;
};
var solve = typeof longestWordInDictionaryThroughDeleting !== 'undefined' ? longestWordInDictionaryThroughDeleting : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const dict = JSON.parse(lines[i+1]);
        console.log(JSON.stringify(solve(s, dict)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
