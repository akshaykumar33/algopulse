var levelOrder = function(root) {
    if (!root) return [];
    let res = [];
    let q = [root];
    while (q.length > 0) {
        let sz = q.length;
        let lvl = [];
        for (let i = 0; i < sz; i++) {
            let node = q.shift();
            lvl.push(node.val);
            if (node.children) {
                for (let child of node.children) {
                    q.push(child);
                }
            }
        }
        res.push(lvl);
    }
    return res;
};
var solve = typeof levelOrder !== 'undefined' ? levelOrder : null;
if (require.main === module) {
    console.log(solve(null));
}
module.exports = solve;
