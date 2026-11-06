function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var isCompleteTree = function(root) {
  if (!root) return true;
  const queue = [root];
  let seenNull = false;

  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (!node) {
      seenNull = true;
    } else {
      if (seenNull) return false;
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  return true;
};

var solve = typeof isCompleteTree !== 'undefined' ? isCompleteTree : null;

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
      for (let i = 0; i < lines.length; i++) {
        const arr = JSON.parse(lines[i]);
        const root = arrayToTree(arr);
        console.log(JSON.stringify(solve(root)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

