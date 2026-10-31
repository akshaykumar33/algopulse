var levelOrder = function(root) {
    if (!root) return [];
    let res = [];
    let q = [root];
    while (q.length > 0) {
        let len = q.length;
        let level = [];
        for (let i = 0; i < len; i++) {
            let cur = q.shift();
            level.push(cur.val);
            if (cur.left) q.push(cur.left);
            if (cur.right) q.push(cur.right);
        }
        res.push(level);
    }
    return res;
};
var solve = typeof levelOrder !== 'undefined' ? levelOrder : null;

if (require.main === module) {
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
  }
  function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let q = [root];
    let i = 1;
    while (q.length > 0 && i < arr.length) {
      let curr = q.shift();
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
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const root = buildTree(parsed);
          const result = solve(root);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(null)));
        }
      }
    }
  } catch (err) {}
}
module.exports = solve;
