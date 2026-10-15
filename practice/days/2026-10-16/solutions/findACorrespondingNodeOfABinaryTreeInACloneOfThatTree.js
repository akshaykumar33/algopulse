function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let q = [root];
    let i = 1;
    while (i < arr.length) {
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
function findNode(root, val) {
    if (!root) return null;
    if (root.val === val) return root;
    let l = findNode(root.left, val);
    if (l) return l;
    return findNode(root.right, val);
}
var findACorrespondingNodeOfABinaryTreeInACloneOfThatTree = function(original, cloned, target) {
    if (Array.isArray(original)) original = buildTree(original);
    if (Array.isArray(cloned)) cloned = buildTree(cloned);
    if (typeof target === 'number') target = findNode(original, target);
    var dfs = function(o, c) {
        if (!o) return null;
        if (o === target) return c;
        let l = dfs(o.left, c.left);
        if (l) return l;
        return dfs(o.right, c.right);
    };
    let ans = dfs(original, cloned);
    return ans ? ans.val : null;
};
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

var solve = typeof findACorrespondingNodeOfABinaryTreeInACloneOfThatTree !== 'undefined' ? findACorrespondingNodeOfABinaryTreeInACloneOfThatTree : null;
