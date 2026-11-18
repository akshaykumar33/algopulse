function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

const memo = new Map();

var allPossibleFBT = function(n) {
  if (n % 2 === 0) return [];
  if (n === 1) return [new TreeNode(0)];
  if (memo.has(n)) return memo.get(n);

  const res = [];
  for (let i = 1; i < n; i += 2) {
    const lefts = allPossibleFBT(i);
    const rights = allPossibleFBT(n - 1 - i);
    for (let l = 0; l < lefts.length; l++) {
      for (let r = 0; r < rights.length; r++) {
        res.push(new TreeNode(0, lefts[l], rights[r]));
      }
    }
  }
  memo.set(n, res);
  return res;
};

var solve = allPossibleFBT;

if (require.main === module) {
  const fs = require('fs');
  const treeToArray = (root) => {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur !== null) {
        res.push(cur.val);
        queue.push(cur.left || null);
        queue.push(cur.right || null);
      } else {
        res.push(null);
      }
    }
    while (res.length > 0 && res[res.length - 1] === null) res.pop();
    return res;
  };

  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const trees = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
      console.log(JSON.stringify(trees.map(treeToArray)));
    }
  } catch (e) {}
}

module.exports = allPossibleFBT;
