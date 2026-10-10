var floodFill = function(image, sr, sc, color) {
    let orig = image[sr][sc];
    if (orig === color) return image;
    let rows = image.length;
    let cols = image[0].length;
    let dfs = function(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== orig) return;
        image[r][c] = color;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };
    dfs(sr, sc);
    return image;
};
var solve = floodFill;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const image = JSON.parse(lines[i]);
        const sr = JSON.parse(lines[i + 1]);
        const sc = JSON.parse(lines[i + 2]);
        const color = JSON.parse(lines[i + 3]);
        i += 3;
        const result = solve(image, sr, sc, color);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
