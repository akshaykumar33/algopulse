function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
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

var allElementsInTwoBinarySearchTrees = function(root1, root2) {
    if (Array.isArray(root1)) root1 = buildTree(root1);
    if (Array.isArray(root2)) root2 = buildTree(root2);

    const arr1 = [];
    const arr2 = [];

    const inorder = (node, arr) => {
        if (!node) return;
        inorder(node.left, arr);
        arr.push(node.val);
        inorder(node.right, arr);
    };

    inorder(root1, arr1);
    inorder(root2, arr2);

    const res = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i++]);
        } else {
            res.push(arr2[j++]);
        }
    }

    while (i < arr1.length) res.push(arr1[i++]);
    while (j < arr2.length) res.push(arr2[j++]);

    return res;
};

var getAllElements = allElementsInTwoBinarySearchTrees;
var solve = allElementsInTwoBinarySearchTrees;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

var solve = typeof allElementsInTwoBinarySearchTrees !== 'undefined' ? allElementsInTwoBinarySearchTrees : null;
