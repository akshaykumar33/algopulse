var nextGreatestLetter = function(letters, target) {
    let l = 0, r = letters.length;
    while (l < r) {
        let m = (l + r) >> 1;
        if (letters[m] <= target) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    return l < letters.length ? letters[l] : letters[0];
};

var solve = function(letters, target) {
    return nextGreatestLetter(letters, target);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const letters = JSON.parse(lines[i]);
          const target = JSON.parse(lines[i + 1]);
          const result = solve(letters, target);
          console.log(JSON.stringify(result));
        } catch (err) {
          console.error('Local runner error:', err.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
