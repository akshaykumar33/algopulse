var lowestCommonAncestor = function(root, p, q) {
    let cur = root;
    while (cur) {
        if (p.val < cur.val && q.val < cur.val) {
            cur = cur.left;
        } else if (p.val > cur.val && q.val > cur.val) {
            cur = cur.right;
        } else {
            return cur;
        }
    }
    return null;
};

var solve = typeof lowestCommonAncestor !== 'undefined' ? lowestCommonAncestor : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
    function TreeNode(val) {
        this.val = val;
        this.left = this.right = null;
    }
    function buildTree(arr) {
        if (!arr || arr.length === 0 || arr[0] === null) return null;
        let root = new TreeNode(arr[0]);
        let q = [root];
        let i = 1;
        while (q.length > 0 && i < arr.length) {
            let node = q.shift();
            if (i < arr.length && arr[i] !== null) {
                node.left = new TreeNode(arr[i]);
                q.push(node.left);
            }
            i++;
            if (i < arr.length && arr[i] !== null) {
                node.right = new TreeNode(arr[i]);
                q.push(node.right);
            }
            i++;
        }
        return root;
    }
    function findNode(root, val) {
        if (!root) return null;
        if (root.val === val) return root;
        let left = findNode(root.left, val);
        if (left) return left;
        return findNode(root.right, val);
    }
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            let root = buildTree([6,2,8,0,4,7,9,null,null,3,5]);
            let p = findNode(root, 2);
            let q = findNode(root, 8);
            let ans = solve(root, p, q);
            console.log(ans ? ans.val : null);
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}
module.exports = solve;
