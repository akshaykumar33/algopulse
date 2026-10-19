var kthSmallest = function(root, k) {
  let count = 0;
  let ans = 0;
  function inorder(node) {
    if (!node || count >= k) return;
    inorder(node.left);
    count++;
    if (count === k) {
      ans = node.val;
      return;
    }
    inorder(node.right);
  }
  inorder(root);
  return ans;
};

var kthSmallestElementInABST = kthSmallest;
var solve = kthSmallest;

if (require.main === module) {
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

  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      const rootArr = JSON.parse(lines[i]);
      const k = JSON.parse(lines[i + 1]);
      console.log(kthSmallest(buildTree(rootArr), k));
    }
  }
}

module.exports = kthSmallest;
