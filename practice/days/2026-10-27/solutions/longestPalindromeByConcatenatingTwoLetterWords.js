var longestPalindromeByConcatenatingTwoLetterWords = function(words) {
    const map = new Map();
    for (const w of words) {
        map.set(w, (map.get(w) || 0) + 1);
    }
    let len = 0;
    let central = false;
    for (const [w, count] of map) {
        const rev = w[1] + w[0];
        if (w[0] === w[1]) {
            if (count % 2 === 0) {
                len += count * 2;
            } else {
                len += (count - 1) * 2;
                central = true;
            }
        } else if (map.has(rev)) {
            if (w < rev) {
                const minPair = Math.min(count, map.get(rev));
                len += minPair * 4;
            }
        }
    }
    if (central) {
        len += 2;
    }
    return len;
};
var solve = longestPalindromeByConcatenatingTwoLetterWords;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
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
