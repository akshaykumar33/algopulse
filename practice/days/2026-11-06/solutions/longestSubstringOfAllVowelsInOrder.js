var longestBeautifulSubstring = function(word) {
  let ans = 0;
  let len = 0;
  let distinct = 0;

  for (let i = 0; i < word.length; i++) {
    if (i === 0 || word[i] >= word[i - 1]) {
      len++;
      if (i === 0 || word[i] > word[i - 1]) {
        distinct++;
      }
    } else {
      len = 1;
      distinct = 1;
    }

    if (distinct === 5 && word[i - len + 1] === 'a') {
      if (len > ans) ans = len;
    }
  }

  return ans;
};

var solve = typeof longestBeautifulSubstring !== 'undefined' ? longestBeautifulSubstring : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const word = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(word)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

