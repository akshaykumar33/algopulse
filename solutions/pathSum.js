function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        const curr = queue.shift();
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

var solve = function(root, targetSum) {
    if (Array.isArray(root)) {
        targetSum = root[1];
        root = buildTree(root[0]);
    }
    if (!root) return false;
    if (!root.left && !root.right) return root.val === targetSum;
    return solve(root.left, targetSum - root.val) || solve(root.right, targetSum - root.val);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const root = JSON.parse(lines[i]);
        const targetSum = JSON.parse(lines[i + 1]);
        const res = solve([root, targetSum]);
        console.log(JSON.stringify(res));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
