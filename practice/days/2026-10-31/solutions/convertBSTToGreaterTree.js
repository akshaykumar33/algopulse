function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var convertBST = function(root) {
    let sum = 0;
    let cur = root;
    let stack = [];
    
    while (cur !== null || stack.length > 0) {
        while (cur !== null) {
            stack.push(cur);
            cur = cur.right;
        }
        cur = stack.pop();
        sum += cur.val;
        cur.val = sum;
        cur = cur.left;
    }
    
    return root;
};

var solve = typeof convertBST !== 'undefined' ? convertBST : null;

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    const root = buildTree(parsed);
                    const res = solve(root);
                    console.log(JSON.stringify(treeToArray(res)));
                } catch (e) {
                    console.error(e);
                }
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let q = [root];
    let i = 1;
    while (i < arr.length) {
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

function treeToArray(root) {
    if (!root) return [];
    let res = [];
    let q = [root];
    while (q.length > 0) {
        let curr = q.shift();
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

module.exports = solve;
