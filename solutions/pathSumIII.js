var pathSum = function(root, targetSum) {
    let count = 0;
    let map = new Map();
    map.set(0, 1);
    
    function dfs(node, currentSum) {
        if (!node) return;
        currentSum += node.val;
        count += (map.get(currentSum - targetSum) || 0);
        map.set(currentSum, (map.get(currentSum) || 0) + 1);
        
        dfs(node.left, currentSum);
        dfs(node.right, currentSum);
        
        map.set(currentSum, map.get(currentSum) - 1);
    }
    
    dfs(root, 0);
    return count;
};

var solve = typeof pathSum !== 'undefined' ? pathSum : null;

// ---------------- LOCAL TEST HARNESS ----------------
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function arrayToTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        let curr = queue.shift();
        if (arr[i] !== null) {
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
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const rootArr = JSON.parse(lines[i]);
        const targetSum = JSON.parse(lines[i+1]);
        const root = arrayToTree(rootArr);
        console.log(JSON.stringify(solve(root, targetSum)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
