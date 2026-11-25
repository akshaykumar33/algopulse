var maximumWhiteTiles = function(tiles, carpetLen) {
  tiles.sort((a, b) => a[0] - b[0]);
  const n = tiles.length;
  let cover = 0;
  let ans = 0;
  let j = 0;
  for (let i = 0; i < n; i++) {
    const end = tiles[i][0] + carpetLen - 1;
    while (j < n && tiles[j][1] <= end) {
      cover += tiles[j][1] - tiles[j][0] + 1;
      j++;
    }
    let cur = cover;
    if (j < n && tiles[j][0] <= end) {
      cur += end - tiles[j][0] + 1;
    }
    if (cur > ans) ans = cur;
    if (j > i) {
      cover -= tiles[i][1] - tiles[i][0] + 1;
    } else {
      j = i + 1;
    }
  }
  return ans;
};

var solve = maximumWhiteTiles;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const tiles = JSON.parse(lines[i]);
      const carpetLen = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(maximumWhiteTiles(tiles, carpetLen)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = maximumWhiteTiles;
