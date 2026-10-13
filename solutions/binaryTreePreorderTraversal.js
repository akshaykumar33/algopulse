function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  let root = new TreeNode(arr[0]);
  let q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    let cur = q.shift();
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
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

var preorderTraversal = function(root) {
  if (Array.isArray(root)) {
    root = buildTree(root);
  }
  let ans = [];
  let st = [];
  if (root) st.push(root);
  while (st.length > 0) {
    let cur = st.pop();
    ans.push(cur.val);
    if (cur.right) st.push(cur.right);
    if (cur.left) st.push(cur.left);
  }
  return ans;
};

var binaryTreePreorderTraversal = preorderTraversal;
var solve = preorderTraversal;

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
  } catch (err) {}
}

module.exports = solve;
