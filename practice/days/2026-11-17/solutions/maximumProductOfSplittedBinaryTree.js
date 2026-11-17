function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

var maxProduct = function(root) {
  const sums = [];

  function getSum(node) {
    if (!node) return 0n;
    const s = BigInt(node.val) + getSum(node.left) + getSum(node.right);
    sums.push(s);
    return s;
  }

  const total = getSum(root);
  let best = 0n;

  for (let i = 0; i < sums.length; i++) {
    const s = sums[i];
    const prod = s * (total - s);
    if (prod > best) {
      best = prod;
    }
  }

  return Number(best % 1000000007n);
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
  return maxProduct(root);
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
