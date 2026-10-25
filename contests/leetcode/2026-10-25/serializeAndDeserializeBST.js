function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function buildTree(arr) {
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
}

function treeToArr(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length > 0) {
    const node = q.shift();
    if (node) {
      res.push(node.val);
      q.push(node.left);
      q.push(node.right);
    } else {
      res.push(null);
    }
  }
  while (res.length > 0 && res[res.length - 1] === null) res.pop();
  return res;
}

var serialize = function(root) {
  if (!root) return '';
  const a = [];
  function pre(node) {
    if (!node) return;
    a.push(node.val);
    pre(node.left);
    pre(node.right);
  }
  pre(root);
  return a.join(',');
};

var deserialize = function(data) {
  if (!data) return null;
  const a = data.split(',').map(Number);
  let i = 0;
  function bld(min, max) {
    if (i >= a.length) return null;
    const v = a[i];
    if (v < min || v > max) return null;
    i++;
    const node = new TreeNode(v);
    node.left = bld(min, v);
    node.right = bld(v, max);
    return node;
  }
  return bld(-Infinity, Infinity);
};

var solve = function(arr) {
  const root = buildTree(arr);
  const s = serialize(root);
  const r2 = deserialize(s);
  return treeToArr(r2);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = { serialize, deserialize, solve };
