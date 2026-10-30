function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    const curr = q.shift();
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

class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.pushAll(root);
  }
  pushAll(node) {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }
  next() {
    const node = this.stack.pop();
    if (node.right) {
      this.pushAll(node.right);
    }
    return node.val;
  }
  hasNext() {
    return this.stack.length > 0;
  }
}

function solve(operations, operands) {
  let it = null;
  const res = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "BSTIterator") {
      const root = buildTree(operands[i][0]);
      it = new BSTIterator(root);
      res.push(null);
    } else if (op === "next") {
      res.push(it.next());
    } else if (op === "hasNext") {
      res.push(it.hasNext());
    }
  }
  return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const ops = JSON.parse(lines[0]);
      const vals = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(ops, vals)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
