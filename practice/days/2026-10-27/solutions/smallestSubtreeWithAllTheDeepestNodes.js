var subtreeWithAllDeepest = function(root) {
    var dfs = function(node) {
        if (!node) return [0, null];
        let left = dfs(node.left);
        let right = dfs(node.right);
        if (left[0] > right[0]) {
            return [left[0] + 1, left[1]];
        } else if (left[0] < right[0]) {
            return [right[0] + 1, right[1]];
        } else {
            return [left[0] + 1, node];
        }
    };
    return dfs(root)[1];
};
var solve = typeof subtreeWithAllDeepest !== 'undefined' ? subtreeWithAllDeepest : null;

class TreeNode {
    constructor(val, left, right) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
        let curr = queue.shift();
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

function treeToArray(root) {
    if (!root) return [];
    let res = [];
    let queue = [root];
    while (queue.length > 0) {
        let curr = queue.shift();
        if (curr) {
            res.push(curr.val);
            queue.push(curr.left);
            queue.push(curr.right);
        } else {
            res.push(null);
        }
    }
    while (res.length > 0 && res[res.length - 1] === null) {
        res.pop();
    }
    return res;
}

function runTests() {
    let root = buildTree([3,5,1,6,2,0,8,null,null,7,4]);
    let ans = solve(root);
    console.log(JSON.stringify(treeToArray(ans)));
}

if (require.main === module) {
    runTests();
}

module.exports = solve;
