const Node = typeof TreeNode !== 'undefined' ? TreeNode : function(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
};

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new Node(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    const curr = q.shift();
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      curr.left = new Node(arr[i]);
      q.push(curr.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      curr.right = new Node(arr[i]);
      q.push(curr.right);
    }
    i++;
  }
  return root;
}

var rob = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  if (!root) return 0;
  const stack = [root];
  const order = [];
  while (stack.length > 0) {
    const u = stack.pop();
    order.push(u);
    if (u.left) stack.push(u.left);
    if (u.right) stack.push(u.right);
  }
  const dp = new Map();
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    const l = dp.get(u.left) || [0, 0];
    const r = dp.get(u.right) || [0, 0];
    const robVal = u.val + l[1] + r[1];
    const notRobVal = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
    dp.set(u, [robVal, notRobVal]);
  }
  const ans = dp.get(root);
  return Math.max(ans[0], ans[1]);
};

var solve = rob;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const res = solve(parsed);
          console.log(JSON.stringify(res));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

if (typeof module !== 'undefined') {
  module.exports = rob;
}
