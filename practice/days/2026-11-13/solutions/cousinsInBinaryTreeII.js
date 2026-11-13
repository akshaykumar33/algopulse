var replaceValueInTree = function(root) {
  if (!root) return null;
  root.val = 0;
  let curLevel = [root];
  while (curLevel.length > 0) {
    let nextSum = 0;
    for (let i = 0; i < curLevel.length; i++) {
      const u = curLevel[i];
      if (u.left) nextSum += u.left.val;
      if (u.right) nextSum += u.right.val;
    }
    const nextLevel = [];
    for (let i = 0; i < curLevel.length; i++) {
      const u = curLevel[i];
      let sibSum = 0;
      if (u.left) sibSum += u.left.val;
      if (u.right) sibSum += u.right.val;
      if (u.left) {
        u.left.val = nextSum - sibSum;
        nextLevel.push(u.left);
      }
      if (u.right) {
        u.right.val = nextSum - sibSum;
        nextLevel.push(u.right);
      }
    }
    curLevel = nextLevel;
  }
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
      console.log(JSON.stringify(treeToArray(replaceValueInTree(tree))));
    }
  }
}

module.exports = replaceValueInTree;
