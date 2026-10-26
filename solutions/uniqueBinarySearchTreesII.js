function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var solve = function(n) {
    if (n === 0) return [];
    
    const memo = new Map();
    
    function build(start, end) {
        if (start > end) return [null];
        const key = start + ',' + end;
        if (memo.has(key)) return memo.get(key);
        
        const res = [];
        for (let i = start; i <= end; i++) {
            const leftTrees = build(start, i - 1);
            const rightTrees = build(i + 1, end);
            
            for (const l of leftTrees) {
                for (const r of rightTrees) {
                    const root = new TreeNode(i, l, r);
                    res.push(root);
                }
            }
        }
        memo.set(key, res);
        return res;
    }
    
    return build(1, n);
};

var generateTrees = solve;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
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
