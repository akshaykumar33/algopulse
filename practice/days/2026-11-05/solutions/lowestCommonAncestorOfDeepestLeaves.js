var lowestCommonAncestorOfDeepestLeaves = function(root) {
    const dfs = function(node) {
        if (!node) return [0, null];
        const left = dfs(node.left);
        const right = dfs(node.right);
        if (left[0] > right[0]) {
            return [left[0] + 1, left[1]];
        }
        if (right[0] > left[0]) {
            return [right[0] + 1, right[1]];
        }
        return [left[0] + 1, node];
    };
    return dfs(root)[1];
};
var solve = typeof lowestCommonAncestorOfDeepestLeaves !== 'undefined' ? lowestCommonAncestorOfDeepestLeaves : null;

// ---------------- LOCAL TEST HARNESS ----------------
class TreeNode {
    constructor(val, left, right) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        const curr = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            curr.left = new TreeNode(arr[i]);
            queue.push(curr.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            curr.right = new TreeNode(arr[i]);
            queue.push(curr.right);
        }
        i++;
    }
    return root;
}

function treeToArray(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while (queue.length > 0) {
        const curr = queue.shift();
        if (curr) {
            res.push(curr.val);
            queue.push(curr.left);
            queue.push(curr.right);
        } else {
            res.push(null);
        }
    }
    while (res.length > 0 && res[res.length - 1] === null) {
        res.pop();
    }
    return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const root = buildTree(parsed);
          const resultNode = solve(root);
          const result = treeToArray(resultNode);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.error(e);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
