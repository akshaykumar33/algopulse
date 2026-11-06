var numTilePossibilities = function(tiles) {
  const count = new Int32Array(26);
  for (let i = 0; i < tiles.length; i++) {
    count[tiles.charCodeAt(i) - 65]++;
  }

  let total = 0;
  function dfs() {
    for (let c = 0; c < 26; c++) {
      if (count[c] > 0) {
        count[c]--;
        total++;
        dfs();
        count[c]++;
      }
    }
  }

  dfs();
  return total;
};

var solve = typeof numTilePossibilities !== 'undefined' ? numTilePossibilities : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const tiles = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(tiles)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

