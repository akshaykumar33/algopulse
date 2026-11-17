function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var minimumOperations = function(root) {
  if (!root) return 0;
  const q = [root];
  let totalSwaps = 0;

  while (q.length > 0) {
    const size = q.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    const n = level.length;
    const sorted = level.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
    const vis = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      if (vis[i] || sorted[i][1] === i) continue;
      let cycle = 0;
      let j = i;
      while (!vis[j]) {
        vis[j] = 1;
        j = sorted[j][1];
        cycle++;
      }
      if (cycle > 0) totalSwaps += (cycle - 1);
    }
  }

  return totalSwaps;
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

var solve = function(arr) {
  const root = buildTree(arr);
  return minimumOperations(root);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
        console.log(JSON.stringify(solve(parsed[0])));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
