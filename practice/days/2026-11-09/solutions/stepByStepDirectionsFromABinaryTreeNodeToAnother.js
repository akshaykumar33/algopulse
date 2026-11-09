function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

function arrayToTree(arr) {
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

function findPath(node, target, path) {
  if (!node) return false;
  if (node.val === target) return true;
  if (node.left) {
    path.push('L');
    if (findPath(node.left, target, path)) return true;
    path.pop();
  }
  if (node.right) {
    path.push('R');
    if (findPath(node.right, target, path)) return true;
    path.pop();
  }
  return false;
}

var getDirections = function(root, startValue, destValue) {
  if (Array.isArray(root)) root = arrayToTree(root);
  const startPath = [];
  const destPath = [];
  findPath(root, startValue, startPath);
  findPath(root, destValue, destPath);
  let k = 0;
  while (k < startPath.length && k < destPath.length && startPath[k] === destPath[k]) {
    k++;
  }
  let ans = '';
  for (let i = k; i < startPath.length; i++) ans += 'U';
  for (let i = k; i < destPath.length; i++) ans += destPath[i];
  return ans;
};

var solve = getDirections;

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
  } catch (err) {}
}

module.exports = solve;
