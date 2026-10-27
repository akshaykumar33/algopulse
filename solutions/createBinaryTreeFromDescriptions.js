function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var createBinaryTree = function(descriptions) {
    const map = new Map();
    const children = new Set();
    for (const [p, c, isLeft] of descriptions) {
        children.add(c);
        let parentNode = map.get(p);
        if (!parentNode) {
            parentNode = new TreeNode(p);
            map.set(p, parentNode);
        }
        let childNode = map.get(c);
        if (!childNode) {
            childNode = new TreeNode(c);
            map.set(c, childNode);
        }
        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }
    }
    let root = null;
    for (const [p, c] of descriptions) {
        if (!children.has(p)) {
            root = map.get(p);
            break;
        }
    }
    return root;
};

var solve = createBinaryTree;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      const res = solve(parsed);
      const bfs = (node) => {
        if (!node) return [];
        const q = [node];
        const out = [];
        while (q.length > 0) {
          const cur = q.shift();
          if (cur) {
            out.push(cur.val);
            q.push(cur.left);
            q.push(cur.right);
          } else {
            out.push(null);
          }
        }
        while (out.length > 0 && out[out.length - 1] === null) out.pop();
        return out;
      };
      console.log(JSON.stringify(bfs(res)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
