var queryResults = function(limit, queries) {
  const ballColor = new Map();
  const colorFreq = new Map();
  const ans = new Int32Array(queries.length);

  for (let i = 0; i < queries.length; i++) {
    const x = queries[i][0];
    const y = queries[i][1];

    if (ballColor.has(x)) {
      const oldC = ballColor.get(x);
      const count = colorFreq.get(oldC) - 1;
      if (count === 0) {
        colorFreq.delete(oldC);
      } else {
        colorFreq.set(oldC, count);
      }
    }

    ballColor.set(x, y);
    colorFreq.set(y, (colorFreq.get(y) || 0) + 1);
    ans[i] = colorFreq.size;
  }

  return Array.from(ans);
};

var solve = queryResults;

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

module.exports = queryResults;
