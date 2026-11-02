var findLargestValueInEachTreeRow = function(root) { 
    if (!root) return [];
    let res = [];
    let q = [root];
    while (q.length > 0) {
        let len = q.length;
        let maxVal = -Infinity;
        for (let i = 0; i < len; i++) {
            let node = q.shift();
            if (node.val > maxVal) maxVal = node.val;
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(maxVal);
    }
    return res;
};
var solve = findLargestValueInEachTreeRow;

// ---------------- LOCAL TEST HARNESS ----------------
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function arrayToTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let q = [root];
    let i = 1;
    while (q.length > 0 && i < arr.length) {
        let curr = q.shift();
        if (i < arr.length && arr[i] !== null) {
            curr.left = new TreeNode(arr[i]);
            q.push(curr.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            curr.right = new TreeNode(arr[i]);
            q.push(curr.right);
        }
        i++;
    }
    return root;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const root = arrayToTree(parsed);
          const result = solve(root);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.log(JSON.stringify(solve(null)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
