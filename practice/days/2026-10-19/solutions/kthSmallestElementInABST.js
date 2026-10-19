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

var kthSmallest = function(root, k) {
  if (Array.isArray(root)) {
    k = root[1];
    root = buildTree(root[0]);
  }
  const stack = [];
  let curr = root;
  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    k--;
    if (k === 0) return curr.val;
    curr = curr.right;
  }
  return 0;
};

var solve = kthSmallest;

if (typeof require !== 'undefined' && require.main === module) {
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

if (typeof module !== 'undefined') {
  module.exports = kthSmallest;
}

var solve = typeof kthSmallestElementInABST !== 'undefined' ? kthSmallestElementInABST : null;
