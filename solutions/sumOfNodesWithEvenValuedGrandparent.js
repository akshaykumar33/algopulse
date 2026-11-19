function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var sumEvenGrandparent = function(root) {
  let ans = 0;
  function dfs(node, parent, grand) {
    if (!node) return;
    if (grand && grand.val % 2 === 0) {
      ans += node.val;
    }
    dfs(node.left, node, parent);
    dfs(node.right, node, parent);
  }
  dfs(root, null, null);
  return ans;
};

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  let qh = 0;
  while (i < arr.length && qh < queue.length) {
    const curr = queue[qh++];
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

var solve = sumEvenGrandparent;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const root = buildTree(parsed);
      console.log(JSON.stringify(solve(root)));
    }
  } catch (e) {}
}

module.exports = sumEvenGrandparent;
