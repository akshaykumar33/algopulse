function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function arrayToTree(arr) {
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
}

function treeToArray(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur !== null && cur !== undefined) {
      res.push(cur.val);
      queue.push(cur.left || null);
      queue.push(cur.right || null);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) res.pop();
  return res;
}

var recoverTree = function(root) {
  let first = null;
  let second = null;
  let prev = null;

  const traverse = (node) => {
    if (!node) return;
    traverse(node.left);
    if (prev && prev.val > node.val) {
      if (!first) {
        first = prev;
      }
      second = node;
    }
    prev = node;
    traverse(node.right);
  };

  traverse(root);
  if (first && second) {
    let tmp = first.val;
    first.val = second.val;
    second.val = tmp;
  }
};

var solve = function(root) {
  if (Array.isArray(root)) {
    const tree = arrayToTree(root);
    recoverTree(tree);
    return treeToArray(tree);
  }
  recoverTree(root);
  return root;
};

var recoverBinarySearchTree = solve;

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

module.exports = recoverTree;
module.exports.solve = solve;
module.exports.recoverBinarySearchTree = recoverBinarySearchTree;
