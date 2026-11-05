function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var constructFromPrePost = function(preorder, postorder) {
    let preIdx = 0;
    let postIdx = 0;
    
    function dfs() {
        let root = new TreeNode(preorder[preIdx++]);
        if (root.val !== postorder[postIdx]) {
            root.left = dfs();
        }
        if (root.val !== postorder[postIdx]) {
            root.right = dfs();
        }
        postIdx++;
        return root;
    }
    
    return dfs();
};

var solve = typeof constructFromPrePost !== 'undefined' ? constructFromPrePost : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const treeToArray = (root) => {
    if (!root) return [];
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

  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const preorder = JSON.parse(lines[i]);
        const postorder = JSON.parse(lines[i + 1]);
        const result = solve(preorder, postorder);
        console.log(JSON.stringify(treeToArray(result)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
