var trimBST = function(root, low, high) {
    if (!root) return null;
    if (root.val < low) return trimBST(root.right, low, high);
    if (root.val > high) return trimBST(root.left, low, high);
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
};
var solve = trimBST;

if (require.main === module) {
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
  }
  function parseTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const q = [root];
    let i = 1;
    while (q.length > 0 && i < arr.length) {
      const cur = q.shift();
      if (i < arr.length && arr[i] !== null) {
        cur.left = new TreeNode(arr[i]);
        q.push(cur.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        cur.right = new TreeNode(arr[i]);
        q.push(cur.right);
      }
      i++;
    }
    return root;
  }
  function treeToArray(root) {
    if (!root) return [];
    const res = [];
    const q = [root];
    while (q.length > 0) {
      const cur = q.shift();
      if (cur) {
        res.push(cur.val);
        q.push(cur.left);
        q.push(cur.right);
      } else {
        res.push(null);
      }
    }
    while (res.length > 0 && res[res.length - 1] === null) {
      res.pop();
    }
    return res;
  }
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const root = parseTree(JSON.parse(lines[0]));
    const low = JSON.parse(lines[1]);
    const high = JSON.parse(lines[2]);
    const res = solve(root, low, high);
    console.log(JSON.stringify(treeToArray(res)));
  }
}
module.exports = solve;
