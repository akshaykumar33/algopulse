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

var pathSum = function(root, targetSum) {
  if (Array.isArray(root)) root = buildTree(root);
  const res = [];
  const path = [];

  function dfs(node, remaining) {
    if (!node) return;
    path.push(node.val);
    if (!node.left && !node.right && node.val === remaining) {
      res.push([...path]);
    } else {
      dfs(node.left, remaining - node.val);
      dfs(node.right, remaining - node.val);
    }
    path.pop();
  }

  dfs(root, targetSum);
  return res;
};

var solve = pathSum;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const rootArr = JSON.parse(lines[i]);
        const targetSum = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(rootArr, targetSum)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
