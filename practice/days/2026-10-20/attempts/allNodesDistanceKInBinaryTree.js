function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
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

var distanceK = function(root, target, k) {
    const parent = new Map();
    const dfs = function(node, par) {
        if (!node) return;
        if (par) parent.set(node, par);
        dfs(node.left, node);
        dfs(node.right, node);
    };
    dfs(root, null);

    const queue = [target];
    const vis = new Set([target]);
    let dist = 0;
    
    while (queue.length > 0) {
        if (dist === k) break;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const curr = queue.shift();
            const neighbors = [curr.left, curr.right, parent.get(curr)];
            for (const neighbor of neighbors) {
                if (neighbor && !vis.has(neighbor)) {
                    vis.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        dist++;
    }
    
    return queue.map(node => node.val);
};

var solve = function(rootArr, targetVal, k) {
    const root = buildTree(rootArr);
    let targetNode = null;
    const findTarget = function(node, val) {
        if (!node) return;
        if (node.val === val) {
            targetNode = node;
            return;
        }
        findTarget(node.left, val);
        findTarget(node.right, val);
    };
    findTarget(root, targetVal);
    return distanceK(root, targetNode, k);
};

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
