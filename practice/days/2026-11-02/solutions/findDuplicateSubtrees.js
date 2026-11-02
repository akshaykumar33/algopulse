var findDuplicateSubtrees = function(root) { 
  const cnt = new Map();
  const res = [];
  
  function serialize(node) {
    if (!node) return '#';
    const s = `${node.val},${serialize(node.left)},${serialize(node.right)}`;
    const freq = (cnt.get(s) || 0) + 1;
    cnt.set(s, freq);
    if (freq === 2) {
      res.push(node);
    }
    return s;
  }
  
  serialize(root);
  return res;
};

var solve = typeof findDuplicateSubtrees !== 'undefined' ? findDuplicateSubtrees : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const q = [root];
    let i = 1;
    while (q.length > 0 && i < arr.length) {
      const curr = q.shift();
      if (arr[i] !== null) {
        curr.left = { val: arr[i], left: null, right: null };
        q.push(curr.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        curr.right = { val: arr[i], left: null, right: null };
        q.push(curr.right);
      }
      i++;
    }
    return root;
  }
  function treeToArray(root) {
    if (!root) return [];
    const res = [];
    const q = [root];
    while (q.length > 0) {
      const curr = q.shift();
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
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        const root = buildTree(parsed);
        const duplicates = solve(root);
        const output = duplicates.map(node => treeToArray(node));
        console.log(JSON.stringify(output));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
