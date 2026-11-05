var evenOddTree = function(root) {
    if (!root) return true;
    let q = [root];
    let level = 0;
    while (q.length > 0) {
        let sz = q.length;
        let prev = null;
        for (let i = 0; i < sz; i++) {
            let cur = q.shift();
            let val = cur.val;
            if (level % 2 === 0) {
                if (val % 2 === 0) return false;
                if (prev !== null && val <= prev) return false;
            } else {
                if (val % 2 !== 0) return false;
                if (prev !== null && val >= prev) return false;
            }
            prev = val;
            if (cur.left) q.push(cur.left);
            if (cur.right) q.push(cur.right);
        }
        level++;
    }
    return true;
};
var solve = typeof evenOddTree !== 'undefined' ? evenOddTree : null;

class TreeNode {
    constructor(val, left, right) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
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

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      const root = buildTree(parsed);
      const res = solve(root);
      console.log(res);
    }
  }
}
module.exports = solve;
