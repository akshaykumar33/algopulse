class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
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

var solve = function(root) {
  if (Array.isArray(root)) {
    root = buildTree(root);
  }
  
  let ans = 0;
  
  function dfs(node, minVal, maxVal) {
    if (!node) return;
    ans = Math.max(ans, Math.abs(node.val - minVal), Math.abs(node.val - maxVal));
    const nextMin = Math.min(minVal, node.val);
    const nextMax = Math.max(maxVal, node.val);
    dfs(node.left, nextMin, nextMax);
    dfs(node.right, nextMin, nextMax);
  }
  
  if (root) {
    dfs(root, root.val, root.val);
  }
  
  return ans;
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
