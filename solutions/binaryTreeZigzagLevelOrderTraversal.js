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

function solve(root) {
    if (Array.isArray(root)) root = buildTree(root);
    if (!root) return [];
    const ans = [];
    const q = [root];
    let leftToRight = true;
    while (q.length > 0) {
        const size = q.length;
        const level = new Array(size);
        for (let i = 0; i < size; i++) {
            const cur = q.shift();
            const idx = leftToRight ? i : size - 1 - i;
            level[idx] = cur.val;
            if (cur.left) q.push(cur.left);
            if (cur.right) q.push(cur.right);
        }
        ans.push(level);
        leftToRight = !leftToRight;
    }
    return ans;
}

var zigzagLevelOrder = solve;

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    const result = Array.isArray(parsed) ? solve(parsed) : solve(parsed);
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
