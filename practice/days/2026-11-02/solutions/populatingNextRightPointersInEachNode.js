var connect = function(root) {
    if (!root) return null;
    let cur = root;
    while (cur && cur.left) {
        let nxt = cur;
        while (nxt) {
            nxt.left.next = nxt.right;
            if (nxt.next) {
                nxt.right.next = nxt.next.left;
            }
            nxt = nxt.next;
        }
        cur = cur.left;
    }
    return root;
};
var solve = connect;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  function Node(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
  function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new Node(arr[0]);
    let q = [root];
    let i = 1;
    while (i < arr.length && q.length > 0) {
        let curr = q.shift();
        if (i < arr.length && arr[i] !== null) {
            curr.left = new Node(arr[i]);
            q.push(curr.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            curr.right = new Node(arr[i]);
            q.push(curr.right);
        }
        i++;
    }
    return root;
  }
  function treeToLevelOrderArray(root) {
    if (!root) return [];
    let res = [];
    let cur = root;
    while (cur) {
        let node = cur;
        while (node) {
            res.push(node.val);
            node = node.next;
        }
        res.push(null);
        cur = cur.left;
    }
    return res;
  }
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const root = buildTree(parsed);
          const resultRoot = solve(root);
          const result = treeToLevelOrderArray(resultRoot);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.error(e);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
