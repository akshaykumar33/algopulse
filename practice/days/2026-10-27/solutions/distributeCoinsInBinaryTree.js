var distributeCoins = function(root) {
    let ans = 0;
    const dfs = function(node) {
        if (!node) return 0;
        let left = dfs(node.left);
        let right = dfs(node.right);
        ans += Math.abs(left) + Math.abs(right);
        return node.val + left + right - 1;
    };
    dfs(root);
    return ans;
};
var solve = typeof distributeCoins !== 'undefined' ? distributeCoins : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          function parseTree(arr, i = 0) {
            if (i >= arr.length || arr[i] === null) return null;
            const node = { val: arr[i], left: null, right: null };
            node.left = parseTree(arr, 2 * i + 1);
            node.right = parseTree(arr, 2 * i + 2);
            return node;
          }
          const root = parseTree(parsed);
          const result = solve(root);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
