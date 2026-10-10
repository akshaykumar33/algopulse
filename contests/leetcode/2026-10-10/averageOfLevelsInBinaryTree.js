function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    const cur = q.shift();
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

var averageOfLevels = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  if (!root) return [];
  const res = [];
  let q = [root];
  while (q.length > 0) {
    const len = q.length;
    let sum = 0;
    const nextQ = [];
    for (let i = 0; i < len; i++) {
      const cur = q[i];
      sum += cur.val;
      if (cur.left) nextQ.push(cur.left);
      if (cur.right) nextQ.push(cur.right);
    }
    res.push(sum / len);
    q = nextQ;
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && averageOfLevels.length > 1 ? averageOfLevels(...parsed) : averageOfLevels(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(averageOfLevels(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = averageOfLevels;
