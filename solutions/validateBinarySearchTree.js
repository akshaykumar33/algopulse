function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

const arrayToTree = (arr) => {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const cur = queue.shift();
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      cur.left = new TreeNode(arr[i]);
      queue.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      cur.right = new TreeNode(arr[i]);
      queue.push(cur.right);
    }
    i++;
  }
  return root;
};

var isValidBST = function(root) {
  function check(node, min, max) {
    if (!node) return true;
    if (min !== null && node.val <= min) return false;
    if (max !== null && node.val >= max) return false;
    return check(node.left, min, node.val) && check(node.right, node.val, max);
  }
  return check(root, null, null);
};

var solve = function(arr) {
  const root = Array.isArray(arr) ? arrayToTree(arr) : arr;
  return isValidBST(root);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

