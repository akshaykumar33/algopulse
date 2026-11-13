var reverseOddLevels = function(root) {
  if (!root) return null;

  const dfs = (node1, node2, level) => {
    if (!node1 || !node2) return;
    if (level % 2 === 1) {
      const temp = node1.val;
      node1.val = node2.val;
      node2.val = temp;
    }
    dfs(node1.left, node2.right, level + 1);
    dfs(node1.right, node2.left, level + 1);
  };

  dfs(root.left, root.right, 1);
  return root;
};

if (require.main === module) {
  function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
  const arrayToTree = (arr) => {
    if (!arr || !arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const q = [root];
    let i = 1;
    let head = 0;
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
  };
  const treeToArray = (root) => {
    if (!root) return [];
    const res = [];
    const q = [root];
    let head = 0;
    while (head < q.length) {
      const cur = q[head++];
      if (cur !== null) {
        res.push(cur.val);
        q.push(cur.left || null);
        q.push(cur.right || null);
      } else {
        res.push(null);
      }
    }
    while (res.length && res[res.length - 1] === null) res.pop();
    return res;
  };
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const tree = arrayToTree(JSON.parse(line));
      console.log(JSON.stringify(treeToArray(reverseOddLevels(tree))));
    }
  }
}

module.exports = reverseOddLevels;
