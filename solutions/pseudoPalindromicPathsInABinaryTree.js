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
    const node = q.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      q.push(node.right);
    }
    i++;
  }
  return root;
}

var pseudoPalindromicPaths = function(root) {
  let count = 0;

  function dfs(node, mask) {
    if (!node) return;
    mask ^= (1 << node.val);
    if (!node.left && !node.right) {
      if ((mask & (mask - 1)) === 0) count++;
      return;
    }
    dfs(node.left, mask);
    dfs(node.right, mask);
  }

  dfs(root, 0);
  return count;
};

var solve = function(treeArr) {
  return pseudoPalindromicPaths(buildTree(treeArr));
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}
