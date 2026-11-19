var minimumTimeToInitialState = function(word, k) {
  const n = word.length;
  let t = 1;
  while (t * k < n) {
    if (word.startsWith(word.slice(t * k))) {
      return t;
    }
    t++;
  }
  return t;
};

var solve = minimumTimeToInitialState;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minimumTimeToInitialState;
