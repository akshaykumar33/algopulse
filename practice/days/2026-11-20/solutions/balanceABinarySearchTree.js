function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var balanceBST = function(root) {
  const vals = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    vals.push(node.val);
    inorder(node.right);
  }
  inorder(root);

  function build(l, r) {
    if (l > r) return null;
    const mid = (l + r) >> 1;
    const node = new TreeNode(vals[mid]);
    node.left = build(l, mid - 1);
    node.right = build(mid + 1, r);
    return node;
  }

  return build(0, vals.length - 1);
};

const arrayToTree = (arr) => {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const cur = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      cur.left = new TreeNode(arr[i]);
      queue.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      cur.right = new TreeNode(arr[i]);
      queue.push(cur.right);
    }
    i++;
  }
  return root;
};

const treeToArray = (root) => {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur !== null) {
      res.push(cur.val);
      queue.push(cur.left || null);
      queue.push(cur.right || null);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) {
    res.pop();
  }
  return res;
};

var solve = function(arr) {
  const root = arrayToTree(arr);
  const balanced = balanceBST(root);
  return treeToArray(balanced);
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

module.exports = balanceBST;