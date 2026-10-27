function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var bstFromPreorder = function(nums) {
    let i = 0;
    const build = (bound) => {
        if (i === nums.length || nums[i] > bound) return null;
        let root = new TreeNode(nums[i++]);
        root.left = build(root.val);
        root.right = build(bound);
        return root;
    };
    return build(Infinity);
};

var solve = bstFromPreorder;

if (require.main === module) {
    const treeToArray = (root) => {
        if (!root) return [];
        let res = [];
        let q = [root];
        while (q.length > 0) {
            let node = q.shift();
            if (node) {
                res.push(node.val);
                q.push(node.left);
                q.push(node.right);
            } else {
                res.push(null);
            }
        }
        while (res.length > 0 && res[res.length - 1] === null) {
            res.pop();
        }
        return res;
    };
    
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    const root = solve(parsed);
                    console.log(JSON.stringify(treeToArray(root)));
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
