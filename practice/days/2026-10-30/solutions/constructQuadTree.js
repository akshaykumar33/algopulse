function _Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val;
  this.isLeaf = isLeaf;
  this.topLeft = topLeft;
  this.topRight = topRight;
  this.bottomLeft = bottomLeft;
  this.bottomRight = bottomRight;
}

var construct = function(grid) {
  function build(r, c, size) {
    const first = grid[r][c];
    let allSame = true;
    for (let i = r; i < r + size; i++) {
      for (let j = c; j < c + size; j++) {
        if (grid[i][j] !== first) {
          allSame = false;
          break;
        }
      }
      if (!allSame) break;
    }
    if (allSame) {
      return new _Node(first === 1, true, null, null, null, null);
    }
    const half = size / 2;
    const tl = build(r, c, half);
    const tr = build(r, c + half, half);
    const bl = build(r + half, c, half);
    const br = build(r + half, c + half, half);
    return new _Node(true, false, tl, tr, bl, br);
  }
  return build(0, 0, grid.length);
};

function quadTreeToArray(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const node = q.shift();
    if (!node) {
      res.push(null);
      continue;
    }
    res.push([node.isLeaf ? 1 : 0, node.val ? 1 : 0]);
    if (!node.isLeaf) {
      q.push(node.topLeft);
      q.push(node.topRight);
      q.push(node.bottomLeft);
      q.push(node.bottomRight);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) res.pop();
  return res;
}

var solve = function(grid) {
  const root = construct(grid);
  return quadTreeToArray(root);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
