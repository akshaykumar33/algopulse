var maximumWidthOfBinaryTree = function(root) {
    if (!root) return 0;
    let ans = 0;
    let queue = [[root, 0]];
    while (queue.length > 0) {
        let size = queue.length;
        let start = queue[0][1];
        let end = queue[size - 1][1];
        ans = Math.max(ans, end - start + 1);
        let nextQueue = [];
        for (let i = 0; i < size; i++) {
            let [node, index] = queue[i];
            let relIndex = index - start;
            if (node.left) {
                nextQueue.push([node.left, 2 * relIndex]);
            }
            if (node.right) {
                nextQueue.push([node.right, 2 * relIndex + 1]);
            }
        }
        queue = nextQueue;
    }
    return ans;
};
var solve = typeof maximumWidthOfBinaryTree !== 'undefined' ? maximumWidthOfBinaryTree : null;

if (require.main === module) {
  const fs = require('fs');
  function TreeNode(val, left, right) {
      this.val = (val===undefined ? 0 : val);
      this.left = (left===undefined ? null : left);
      this.right = (right===undefined ? null : right);
  }
  function createTree(arr) {
      if (!arr || arr.length === 0 || arr[0] === null) return null;
      let root = new TreeNode(arr[0]);
      let queue = [root];
      let i = 1;
      while (queue.length > 0 && i < arr.length) {
          let curr = queue.shift();
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
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const root = createTree(parsed);
          const result = solve(root);
          console.log(result);
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
