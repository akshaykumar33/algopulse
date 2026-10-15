function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    const cur = q.shift();
    if (i < arr.length && arr[i] !== null) {
      cur.left = new TreeNode(arr[i]);
      q.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      cur.right = new TreeNode(arr[i]);
      q.push(cur.right);
    }
    i++;
  }
  return root;
}

var sumOfLeftLeaves = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  let sum = 0;
  const dfs = (node, isLeft) => {
    if (!node) return;
    if (!node.left && !node.right && isLeft) {
      sum += node.val;
    }
    dfs(node.left, true);
    dfs(node.right, false);
  };
  dfs(root, false);
  return sum;
};

var solve = sumOfLeftLeaves;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = sumOfLeftLeaves(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(sumOfLeftLeaves(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = sumOfLeftLeaves;
