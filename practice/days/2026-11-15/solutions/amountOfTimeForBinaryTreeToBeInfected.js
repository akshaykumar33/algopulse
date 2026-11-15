function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

var amountOfTime = function(root, start) {
  const adj = new Map();

  function buildGraph(node, parent) {
    if (!node) return;
    if (!adj.has(node.val)) adj.set(node.val, []);
    if (parent) {
      adj.get(node.val).push(parent.val);
      adj.get(parent.val).push(node.val);
    }
    buildGraph(node.left, node);
    buildGraph(node.right, node);
  }

  buildGraph(root, null);

  const q = [start];
  const vis = new Set([start]);
  let minutes = -1;

  while (q.length > 0) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const u = q.shift();
      const neighbors = adj.get(u) || [];
      for (const v of neighbors) {
        if (!vis.has(v)) {
          vis.add(v);
          q.push(v);
        }
      }
    }
    minutes++;
  }

  return minutes;
};

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
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

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      const tree = buildTree(JSON.parse(lines[i]));
      console.log(JSON.stringify(amountOfTime(tree, JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = amountOfTime;
