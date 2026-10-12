var TreeNode = typeof TreeNode !== 'undefined' ? TreeNode : function(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
};

const buildTree = (arr) => {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
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
};

var findMode = function(root) {
  if (Array.isArray(root)) root = buildTree(root);
  let cur = root;
  let prev = null;
  let cnt = 0;
  let maxCnt = 0;
  let ans = [];

  const update = (val) => {
    if (prev !== null && val === prev) {
      cnt++;
    } else {
      cnt = 1;
      prev = val;
    }
    if (cnt > maxCnt) {
      maxCnt = cnt;
      ans = [val];
    } else if (cnt === maxCnt) {
      ans.push(val);
    }
  };

  while (cur) {
    if (!cur.left) {
      update(cur.val);
      cur = cur.right;
    } else {
      let pre = cur.left;
      while (pre.right && pre.right !== cur) {
        pre = pre.right;
      }
      if (!pre.right) {
        pre.right = cur;
        cur = cur.left;
      } else {
        pre.right = null;
        update(cur.val);
        cur = cur.right;
      }
    }
  }
  return ans;
};

var findModeInBinarySearchTree = findMode;
var solve = findMode;

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
