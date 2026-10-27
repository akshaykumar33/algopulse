function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var buildTree = function(preorder, inorder) {
    let pIdx = 0;
    let map = new Map();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }
    
    function helper(left, right) {
        if (left > right) return null;
        let val = preorder[pIdx++];
        let root = new TreeNode(val);
        let idx = map.get(val);
        root.left = helper(left, idx - 1);
        root.right = helper(idx + 1, right);
        return root;
    }
    
    return helper(0, inorder.length - 1);
};

var solve = buildTree;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const preorder = JSON.parse(lines[i]);
          const inorder = JSON.parse(lines[i+1]);
          const root = solve(preorder, inorder);
          const res = [];
          const queue = [root];
          while (queue.length > 0) {
            const node = queue.shift();
            if (node) {
              res.push(node.val);
              queue.push(node.left);
              queue.push(node.right);
            } else {
              res.push(null);
            }
          }
          while (res.length > 0 && res[res.length - 1] === null) {
            res.pop();
          }
          console.log(JSON.stringify(res));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
