function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var flipMatchVoyage = function(root, voyage) {
  const flipped = [];
  let idx = 0;

  function dfs(node) {
    if (!node) return true;
    if (node.val !== voyage[idx++]) return false;

    if (node.left && node.left.val !== voyage[idx]) {
      flipped.push(node.val);
      return dfs(node.right) && dfs(node.left);
    }
    return dfs(node.left) && dfs(node.right);
  }

  if (dfs(root) && idx === voyage.length) {
    return flipped;
  }
  return [-1];
};

var solve = typeof flipMatchVoyage !== 'undefined' ? flipMatchVoyage : null;

if (require.main === module) {
  const fs = require('fs');
  function arrayToTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const q = [root];
    let i = 1;
    let head = 0;
    while (head < q.length && i < arr.length) {
      const cur = q[head++];
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

  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const rootArr = JSON.parse(lines[i]);
        const voyage = JSON.parse(lines[i + 1]);
        const root = arrayToTree(rootArr);
        console.log(JSON.stringify(solve(root, voyage)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

