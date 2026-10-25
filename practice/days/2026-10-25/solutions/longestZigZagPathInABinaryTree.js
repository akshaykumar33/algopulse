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

var longestZigZag = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  let maxLen = 0;
  function dfs(node, dir, len) {
    if (!node) return;
    if (len > maxLen) maxLen = len;
    if (dir === 0) {
      dfs(node.right, 1, len + 1);
      dfs(node.left, 0, 1);
    } else {
      dfs(node.left, 0, len + 1);
      dfs(node.right, 1, 1);
    }
  }
  if (root) {
    dfs(root.left, 0, 1);
    dfs(root.right, 1, 1);
  }
  return maxLen;
};

var solve = longestZigZag;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = longestZigZag;
