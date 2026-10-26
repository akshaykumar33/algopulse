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

var flipEquivalentBinaryTrees = function(root1, root2) {
    if (Array.isArray(root1)) root1 = buildTree(root1);
    if (Array.isArray(root2)) root2 = buildTree(root2);
    function dfs(r1, r2) {
        if (!r1 && !r2) return true;
        if (!r1 || !r2 || r1.val !== r2.val) return false;
        return (dfs(r1.left, r2.left) && dfs(r1.right, r2.right)) || (dfs(r1.left, r2.right) && dfs(r1.right, r2.left));
    }
    return dfs(root1, root2);
};

var flipEquiv = flipEquivalentBinaryTrees;
var solve = flipEquivalentBinaryTrees;

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            for (let i = 0; i < lines.length; i += 2) {
                const p1 = JSON.parse(lines[i]);
                const p2 = JSON.parse(lines[i + 1]);
                console.log(JSON.stringify(solve(p1, p2)));
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}

module.exports = solve;

var solve = typeof flipEquivalentBinaryTrees !== 'undefined' ? flipEquivalentBinaryTrees : null;
