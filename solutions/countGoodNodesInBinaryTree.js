function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || !arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const cur = q.shift();
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        cur.left = new TreeNode(arr[i]);
        q.push(cur.left);
      }
      i++;
    }
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        cur.right = new TreeNode(arr[i]);
        q.push(cur.right);
      }
      i++;
    }
  }
  return root;
}

var goodNodes = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  if (!root) return 0;
  let count = 0;

  function dfs(node, maxVal) {
    if (!node) return;
    if (node.val >= maxVal) {
      count++;
      maxVal = node.val;
    }
    dfs(node.left, maxVal);
    dfs(node.right, maxVal);
  }

  dfs(root, root.val);
  return count;
};

var solve = goodNodes;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const rootArr = JSON.parse(line);
        console.log(JSON.stringify(solve(rootArr)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
