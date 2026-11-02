function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val);
  this.left = (left===undefined ? null : left);
  this.right = (right===undefined ? null : right);
}

var findFrequentTreeSum = function(root) {
  if (!root) return [];
  const count = new Map();
  let maxCount = 0;

  function dfs(node) {
    if (!node) return 0;
    const sum = node.val + dfs(node.left) + dfs(node.right);
    const c = (count.get(sum) || 0) + 1;
    count.set(sum, c);
    if (c > maxCount) maxCount = c;
    return sum;
  }

  dfs(root);

  const res = [];
  for (const [sum, c] of count.entries()) {
    if (c === maxCount) {
      res.push(sum);
    }
  }
  return res.sort((a, b) => a - b);
};

var solve = typeof findFrequentTreeSum !== 'undefined' ? findFrequentTreeSum : null;

if (require.main === module) {
  function arrayToTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let q = [root];
    let i = 1;
    while (q.length > 0 && i < arr.length) {
      let curr = q.shift();
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

  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      const root = arrayToTree(parsed);
      const res = findFrequentTreeSum(root);
      console.log(JSON.stringify(res));
    }
  }
}

