function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
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

var deepestLeavesSum = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  if (!root) return 0;
  let q = [root];
  let sum = 0;
  while (q.length > 0) {
    const nextQ = [];
    sum = 0;
    for (let i = 0; i < q.length; i++) {
      const node = q[i];
      sum += node.val;
      if (node.left) nextQ.push(node.left);
      if (node.right) nextQ.push(node.right);
    }
    q = nextQ;
  }
  return sum;
};

var solve = deepestLeavesSum;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = deepestLeavesSum;
