var recoverTree = function(root) {
  let first = null;
  let second = null;
  let prev = null;
  let cur = root;
  let stack = [];
  while (cur !== null || stack.length > 0) {
    while (cur !== null) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    if (prev !== null && prev.val > cur.val) {
      if (first === null) {
        first = prev;
        second = cur;
      } else {
        second = cur;
      }
    }
    prev = cur;
    cur = cur.right;
  }
  let tmp = first.val;
  first.val = second.val;
  second.val = tmp;
  return root;
};
var solve = typeof recoverTree !== 'undefined' ? recoverTree : null;

// ---------------- LOCAL TEST HARNESS ----------------
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    let curr = queue.shift();
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
  let res = [];
  let queue = [root];
  while (queue.length > 0) {
    let curr = queue.shift();
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
          solve(root);
          const result = treeToArray(root);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
