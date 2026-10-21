var deleteNode = function(root, key) {
    if (!root) return null;
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        let cur = root.right;
        while (cur.left) {
            cur = cur.left;
        }
        root.val = cur.val;
        root.right = deleteNode(root.right, root.val);
    }
    return root;
};

var deleteNodeInABST = deleteNode;
var solve = deleteNode;

if (require.main === module) {
    function TreeNode(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
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

    function treeToArray(root) {
        if (!root) return [];
        const res = [];
        const q = [root];
        while (q.length > 0) {
            const cur = q.shift();
            if (cur) {
                res.push(cur.val);
                q.push(cur.left);
                q.push(cur.right);
            } else {
                res.push(null);
            }
        }
        while (res.length > 0 && res[res.length - 1] === null) {
            res.pop();
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
                    let [arr, k] = parsed;
                    const root = buildTree(arr);
                    const ans = deleteNode(root, k);
                    console.log(JSON.stringify(treeToArray(ans)));
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
