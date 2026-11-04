function arrayToTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    const node = q.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = { val: arr[i], left: null, right: null };
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = { val: arr[i], left: null, right: null };
      q.push(node.right);
    }
    i++;
  }
  return root;
}

var maxLevelSum = function(root) {
  if (Array.isArray(root)) root = arrayToTree(root);
  if (!root) return 0;
  let q = [root];
  let level = 1;
  let bestLevel = 1;
  let maxSum = -Infinity;

  while (q.length > 0) {
    let sum = 0;
    const nextQ = [];
    for (let i = 0; i < q.length; i++) {
      const node = q[i];
      sum += node.val;
      if (node.left) nextQ.push(node.left);
      if (node.right) nextQ.push(node.right);
    }
    if (sum > maxSum) {
      maxSum = sum;
      bestLevel = level;
    }
    q = nextQ;
    level++;
  }

  return bestLevel;
};

var maximumLevelSumOfABinaryTree = maxLevelSum;
var solve = typeof maximumLevelSumOfABinaryTree !== 'undefined' ? maximumLevelSumOfABinaryTree : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
