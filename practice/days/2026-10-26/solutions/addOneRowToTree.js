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
        const curr = q.shift();
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

function treeToArray(root) {
    if (!root) return [];
    const res = [];
    const q = [root];
    while (q.length > 0) {
        const curr = q.shift();
        if (curr) {
            res.push(curr.val);
            q.push(curr.left);
            q.push(curr.right);
        } else {
            res.push(null);
        }
    }
    while (res.length > 0 && res[res.length - 1] === null) {
        res.pop();
    }
    return res;
}

var addOneRow = function(root, val, depth) {
    if (depth === 1) {
        const newRoot = new TreeNode(val);
        newRoot.left = root;
        return newRoot;
    }
    
    const q = [root];
    let d = 1;
    while (q.length > 0 && d < depth - 1) {
        const len = q.length;
        for (let i = 0; i < len; i++) {
            const curr = q.shift();
            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
        }
        d++;
    }
    
    while (q.length > 0) {
        const curr = q.shift();
        const leftChild = curr.left;
        const rightChild = curr.right;
        
        curr.left = new TreeNode(val);
        curr.left.left = leftChild;
        
        curr.right = new TreeNode(val);
        curr.right.right = rightChild;
    }
    
    return root;
};

var solve = function(rootArr, val, depth) {
    let root = buildTree(rootArr);
    let res = addOneRow(root, val, depth);
    return treeToArray(res);
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
