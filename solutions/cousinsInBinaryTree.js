function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function buildTree(arr) {
    if (!arr || !arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const q = [root];
    let i = 1;
    while (q.length && i < arr.length) {
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

var solve = function(root, x, y) {
    if (Array.isArray(root)) root = buildTree(root);
    let px = null, dx = -1, py = null, dy = -1;
    const dfs = (node, parent, depth) => {
        if (!node) return;
        if (node.val === x) {
            px = parent;
            dx = depth;
        }
        if (node.val === y) {
            py = parent;
            dy = depth;
        }
        dfs(node.left, node, depth + 1);
        dfs(node.right, node, depth + 1);
    };
    dfs(root, null, 0);
    return dx === dy && px !== py;
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
