var kthLargestLevelSum = function(root, k) {
  if (!root) return -1;
  const levelSums = [];
  let q = [root];
  while (q.length > 0) {
    let sum = 0;
    const nextQ = [];
    for (let i = 0; i < q.length; i++) {
      const node = q[i];
      sum += node.val;
      if (node.left) nextQ.push(node.left);
      if (node.right) nextQ.push(node.right);
    }
    levelSums.push(sum);
    q = nextQ;
  }
  if (levelSums.length < k) return -1;
  levelSums.sort((a, b) => (b > a ? 1 : b < a ? -1 : 0));
  return levelSums[k - 1];
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
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
        cur.left = new TreeNode(arr[i]);
        q.push(cur.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
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
    const lines = raw.split(/\r?\n/).filter(Boolean);
    if (lines.length === 1) {
      const parsed = JSON.parse(lines[0]);
      console.log(JSON.stringify(kthLargestLevelSum(buildTree(parsed[0]), parsed[1])));
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const arr = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(kthLargestLevelSum(buildTree(arr), k)));
      }
    }
  }
}

module.exports = kthLargestLevelSum;
