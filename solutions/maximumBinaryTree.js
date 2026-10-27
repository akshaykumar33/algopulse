function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var maximumBinaryTree = function(nums) {
    const build = (l, r) => {
        if (l > r) return null;
        let maxIdx = l;
        for (let i = l + 1; i <= r; i++) {
            if (nums[i] > nums[maxIdx]) {
                maxIdx = i;
            }
        }
        const node = new TreeNode(nums[maxIdx]);
        node.left = build(l, maxIdx - 1);
        node.right = build(maxIdx + 1, r);
        return node;
    };
    return build(0, nums.length - 1);
};

var solve = typeof maximumBinaryTree !== 'undefined' ? maximumBinaryTree : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
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
