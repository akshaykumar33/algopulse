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

function treeToArray(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const cur = q.shift();
    if (cur !== null) {
      res.push(cur.val);
      q.push(cur.left || null);
      q.push(cur.right || null);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) res.pop();
  return res;
}

var delNodes = function(root, to_delete) {
  const isInputArray = Array.isArray(root);
  if (isInputArray) {
    root = buildTree(root);
  }
  const toDel = new Set(to_delete);
  const res = [];

  function dfs(node, isRoot) {
    if (!node) return null;
    const deleted = toDel.has(node.val);
    if (isRoot && !deleted) {
      res.push(node);
    }
    node.left = dfs(node.left, deleted);
    node.right = dfs(node.right, deleted);
    return deleted ? null : node;
  }

  dfs(root, true);
  return isInputArray ? res.map(treeToArray) : res;
};

var solve = delNodes;
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
