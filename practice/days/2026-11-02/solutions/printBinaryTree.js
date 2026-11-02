/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var printBinaryTree = function(root) {
    function getHeight(node) {
        if (!node) {
            return 0;
        }
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    const h = getHeight(root);
    const m = h;
    const n = Math.pow(2, h) - 1;

    const ans = Array(m).fill(0).map(() => Array(n).fill(""));

    function fill(node, r, c) {
        if (!node) {
            return;
        }
        ans[r][c] = String(node.val);

        const offset = Math.pow(2, h - 2 - r);
        fill(node.left, r + 1, c - offset);
        fill(node.right, r + 1, c + offset);
    }

    fill(root, 0, (n - 1) / 2);
    return ans;
};

var solve = typeof printBinaryTree !== 'undefined' ? printBinaryTree : null;

// ---------------- LOCAL TEST HARNESS ----------------

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        let current = queue.shift();

        if (arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;

        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
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
            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    const root = buildTree(parsed);
                    const result = solve(root);
                    console.log(JSON.stringify(result));
                } catch (e) {
                    console.error('Error processing line:', line, e.message);
                }
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}
module.exports = solve;
