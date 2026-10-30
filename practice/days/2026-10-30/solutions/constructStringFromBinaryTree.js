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
    const curr = q.shift();
    if (i < arr.length && arr[i] !== null) {
      curr.left = new TreeNode(arr[i]);
      q.push(curr.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      curr.right = new TreeNode(arr[i]);
      q.push(curr.right);
    }
    i++;
  }
  return root;
}

var tree2str = function(root) {
  if (!root) return "";
  let res = root.val.toString();
  if (root.left || root.right) {
    res += "(" + tree2str(root.left) + ")";
  }
  if (root.right) {
    res += "(" + tree2str(root.right) + ")";
  }
  return res;
};

var solve = function(rootArr) {
  const root = buildTree(rootArr);
  return tree2str(root);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
