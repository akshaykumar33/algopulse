var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left ? left : right;
};
var solve = lowestCommonAncestor;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
      let curr = queue.shift();
      if (i < arr.length && arr[i] !== null) {
        curr.left = new TreeNode(arr[i]);
        queue.push(curr.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        curr.right = new TreeNode(arr[i]);
        queue.push(curr.right);
      }
      i++;
    }
    return root;
  }
  function findNode(root, val) {
    if (!root) return null;
    if (root.val === val) return root;
    let left = findNode(root.left, val);
    if (left) return left;
    return findNode(root.right, val);
  }
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        let root = buildTree(parsed[0]);
        let p = findNode(root, parsed[1]);
        let q = findNode(root, parsed[2]);
        let res = solve(root, p, q);
        console.log(res ? res.val : null);
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
