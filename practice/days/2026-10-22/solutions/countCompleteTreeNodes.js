var TreeNode = typeof TreeNode !== 'undefined' ? TreeNode : function(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
};

function buildTree(arr) {
  if (!arr || !arr.length || arr[0] === null) return null;
  let root = new TreeNode(arr[0]);
  let q = [root];
  let i = 1;
  while (i < arr.length && q.length) {
    let curr = q.shift();
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.left = new TreeNode(arr[i]);
        q.push(curr.left);
      }
      i++;
    }
    if (i < arr.length) {
      if (arr[i] !== null && arr[i] !== undefined) {
        curr.right = new TreeNode(arr[i]);
        q.push(curr.right);
      }
      i++;
    }
  }
  return root;
}

var countNodes = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  if (!root) return 0;
  let l = 0, r = 0;
  let cur = root;
  while (cur) {
    l++;
    cur = cur.left;
  }
  cur = root;
  while (cur) {
    r++;
    cur = cur.right;
  }
  if (l === r) return (1 << l) - 1;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

var solve = countNodes;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

if (typeof module !== 'undefined') {
  module.exports = countNodes;
}
