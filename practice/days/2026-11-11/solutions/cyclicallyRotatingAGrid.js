var rotateGrid = function(grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  const layers = Math.min(m, n) >> 1;
  const res = Array.from({ length: m }, (_, r) => grid[r].slice());

  for (let l = 0; l < layers; l++) {
    const top = l;
    const bottom = m - 1 - l;
    const left = l;
    const right = n - 1 - l;
    const vals = [];

    for (let c = left; c < right; c++) vals.push(grid[top][c]);
    for (let r = top; r < bottom; r++) vals.push(grid[r][right]);
    for (let c = right; c > left; c--) vals.push(grid[bottom][c]);
    for (let r = bottom; r > top; r--) vals.push(grid[r][left]);

    const len = vals.length;
    const shift = k % len;
    let idx = shift;
    const next = () => {
      const v = vals[idx];
      idx++;
      if (idx === len) idx = 0;
      return v;
    };

    for (let c = left; c < right; c++) res[top][c] = next();
    for (let r = top; r < bottom; r++) res[r][right] = next();
    for (let c = right; c > left; c--) res[bottom][c] = next();
    for (let r = bottom; r > top; r--) res[r][left] = next();
  }

  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = rotateGrid.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(rotateGrid(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(rotateGrid(...args)));
      }
    }
  }
}
