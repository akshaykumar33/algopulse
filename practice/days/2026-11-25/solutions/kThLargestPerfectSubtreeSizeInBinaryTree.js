var kthLargestPerfectSubtree = function(root, k) {
  if (!root) return -1;
  const order = [];
  const st = [root];
  while (st.length > 0) {
    const u = st.pop();
    order.push(u);
    if (u.left) st.push(u.left);
    if (u.right) st.push(u.right);
  }
  const sz = new Map();
  const sizes = [];
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!u.left && !u.right) {
      sz.set(u, 1);
      sizes.push(1);
    } else if (u.left && u.right) {
      const l = sz.get(u.left);
      const r = sz.get(u.right);
      if (l > 0 && l === r) {
        const s = l + r + 1;
        sz.set(u, s);
        sizes.push(s);
      } else {
        sz.set(u, -1);
      }
    } else {
      sz.set(u, -1);
    }
  }
  if (sizes.length < k) return -1;
  sizes.sort((a, b) => b - a);
  return sizes[k - 1];
};

var solve = kthLargestPerfectSubtree;

if (require.main === module) {
  function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
  const arrayToTree = (arr) => {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let head = 0;
    let i = 1;
    while (head < queue.length && i < arr.length) {
      const cur = queue[head++];
      if (i < arr.length && arr[i] !== null) {
        cur.left = new TreeNode(arr[i]);
        queue.push(cur.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        cur.right = new TreeNode(arr[i]);
        queue.push(cur.right);
      }
      i++;
    }
    return root;
  };
  const treeToArray = (root) => {
    if (!root) return [];
    const res = [];
    const queue = [root];
    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      if (cur !== null) {
        res.push(cur.val);
        queue.push(cur.left || null);
        queue.push(cur.right || null);
      } else {
        res.push(null);
      }
    }
    while (res.length > 0 && res[res.length - 1] === null) {
      res.pop();
    }
    return res;
  };
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const arr = JSON.parse(lines[i]);
      const k = JSON.parse(lines[i + 1]);
      out.push(JSON.stringify(kthLargestPerfectSubtree(arrayToTree(arr), k)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = kthLargestPerfectSubtree;
