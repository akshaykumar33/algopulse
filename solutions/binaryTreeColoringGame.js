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
    const node = q.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      q.push(node.right);
    }
    i++;
  }
  return root;
}

var btreeGameWinningMove = function(root, n, x) {
  let leftCount = 0;
  let rightCount = 0;

  function count(node) {
    if (!node) return 0;
    const l = count(node.left);
    const r = count(node.right);
    if (node.val === x) {
      leftCount = l;
      rightCount = r;
    }
    return l + r + 1;
  }

  count(root);
  const parentCount = n - 1 - leftCount - rightCount;
  const maxChoice = Math.max(leftCount, rightCount, parentCount);
  return maxChoice > Math.floor(n / 2);
};

var solve = function(treeArr, n, x) {
  const root = buildTree(treeArr);
  return btreeGameWinningMove(root, n, x);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
