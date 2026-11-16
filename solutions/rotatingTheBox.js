var rotateTheBox = function(box) {
  const m = box.length;
  const n = box[0].length;

  for (let r = 0; r < m; r++) {
    let empty = n - 1;
    for (let c = n - 1; c >= 0; c--) {
      if (box[r][c] === '*') {
        empty = c - 1;
      } else if (box[r][c] === '#') {
        box[r][c] = '.';
        box[r][empty] = '#';
        empty--;
      }
    }
  }

  const res = Array.from({ length: n }, () => new Array(m));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      res[c][m - 1 - r] = box[r][c];
    }
  }
  return res;
};

var solve = rotateTheBox;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
