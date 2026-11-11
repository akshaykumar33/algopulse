var FindElements = function(root) {
  this.seen = new Set();
  if (!root) return;
  root.val = 0;
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    const x = node.val;
    this.seen.add(x);
    if (node.left !== null) {
      node.left.val = x * 2 + 1;
      stack.push(node.left);
    }
    if (node.right !== null) {
      node.right.val = x * 2 + 2;
      stack.push(node.right);
    }
  }
};

FindElements.prototype.find = function(target) {
  return this.seen.has(target);
};

if (require.main === module) {
  function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
  function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const q = [root];
    let head = 0;
    let i = 1;
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
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const cmds = JSON.parse(lines[i]);
      const args = JSON.parse(lines[i + 1]);
      const res = [];
      let obj = null;
      for (let j = 0; j < cmds.length; j++) {
        if (cmds[j] === 'FindElements') {
          obj = new FindElements(buildTree(args[j][0]));
          res.push(null);
        } else if (cmds[j] === 'find') {
          res.push(obj.find(args[j][0]));
        }
      }
      console.log(JSON.stringify(res));
    }
  }
}

module.exports = FindElements;
