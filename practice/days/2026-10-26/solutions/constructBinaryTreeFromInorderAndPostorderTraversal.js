function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var buildTree = function(inorder, postorder) {
    let map = new Map();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }
    
    function helper(inLeft, inRight, postLeft, postRight) {
        if (inLeft > inRight || postLeft > postRight) return null;
        let val = postorder[postRight];
        let root = new TreeNode(val);
        let index = map.get(val);
        let leftSize = index - inLeft;
        
        root.left = helper(inLeft, index - 1, postLeft, postLeft + leftSize - 1);
        root.right = helper(index + 1, inRight, postLeft + leftSize, postRight - 1);
        return root;
    }
    
    return helper(0, inorder.length - 1, 0, postorder.length - 1);
};

var solve = function(inorder, postorder) {
    let root = buildTree(inorder, postorder);
    let res = [];
    let q = [root];
    while (q.length > 0) {
        let node = q.shift();
        if (node) {
            res.push(node.val);
            q.push(node.left);
            q.push(node.right);
        } else {
            res.push(null);
        }
    }
    while (res.length > 0 && res[res.length - 1] === null) {
        res.pop();
    }
    return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (i + 1 < lines.length) {
          const inorder = JSON.parse(lines[i]);
          const postorder = JSON.parse(lines[i + 1]);
          const result = solve(inorder, postorder);
          console.log(JSON.stringify(result));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
