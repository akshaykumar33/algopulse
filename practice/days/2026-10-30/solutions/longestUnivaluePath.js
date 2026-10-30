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

var longestUnivaluePath = function(root) {
  let ans = 0;
  function dfs(node) {
    if (!node) return 0;
    const l = dfs(node.left);
    const r = dfs(node.right);
    let leftLen = 0;
    let rightLen = 0;
    if (node.left && node.left.val === node.val) leftLen = l + 1;
    if (node.right && node.right.val === node.val) rightLen = r + 1;
    ans = Math.max(ans, leftLen + rightLen);
    return Math.max(leftLen, rightLen);
  }
  dfs(root);
  return ans;
};

var solve = function(rootArr) {
  const root = buildTree(rootArr);
  return longestUnivaluePath(root);
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
