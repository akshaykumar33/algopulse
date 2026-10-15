function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || !arr.length) return null;
  let root = new TreeNode(arr[0]);
  let q = [root];
  let i = 1;
  while (i < arr.length) {
    let cur = q.shift();
    if (arr[i] !== null && arr[i] !== undefined) {
      cur.left = new TreeNode(arr[i]);
      q.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      cur.right = new TreeNode(arr[i]);
      q.push(cur.right);
    }
    i++;
  }
  return root;
}

var findSecondMinimumValue = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  if (!root) return -1;
  let min1 = root.val;
  let ans = Infinity;
  function dfs(node) {
    if (!node) return;
    if (node.val > min1) {
      ans = Math.min(ans, node.val);
      return;
    }
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return ans === Infinity ? -1 : ans;
};

var solve = findSecondMinimumValue;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
