function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const cur = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      cur.left = new TreeNode(arr[i]);
      queue.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      cur.right = new TreeNode(arr[i]);
      queue.push(cur.right);
    }
    i++;
  }
  return root;
}

var minDiffInBST = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  let minDiff = Infinity;
  let prev = null;
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev);
    }
    prev = node.val;
    inorder(node.right);
  }
  inorder(root);
  return minDiff;
};

var solve = minDiffInBST;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
