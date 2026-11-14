var CBTInserter = function(root) {
  this.root = root;
  this.nodes = [];
  const q = [root];
  let head = 0;
  while (head < q.length) {
    const node = q[head++];
    this.nodes.push(node);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
};

CBTInserter.prototype.insert = function(val) {
  const child = { val, left: null, right: null };
  this.nodes.push(child);
  const parentIdx = Math.floor(this.nodes.length / 2) - 1;
  const parent = this.nodes[parentIdx];
  if (!parent.left) parent.left = child;
  else parent.right = child;
  return parent.val;
};

CBTInserter.prototype.get_root = function() {
  return this.root;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      const cmds = JSON.parse(lines[i]);
      const args = JSON.parse(lines[i + 1]);
      let obj = null;
      const out = [];
      for (let j = 0; j < cmds.length; j++) {
        const cmd = cmds[j];
        const a = args[j];
        if (cmd === 'CBTInserter') {
          function buildTree(arr) {
            if (!arr || arr.length === 0) return null;
            const nodes = arr.map(v => v !== null ? { val: v, left: null, right: null } : null);
            for (let k = 0; k < nodes.length; k++) {
              if (nodes[k]) {
                const lIdx = 2 * k + 1, rIdx = 2 * k + 2;
                if (lIdx < nodes.length) nodes[k].left = nodes[lIdx];
                if (rIdx < nodes.length) nodes[k].right = nodes[rIdx];
              }
            }
            return nodes[0];
          }
          const root = buildTree(a[0]);
          obj = new CBTInserter(root);
          out.push(null);
        } else if (cmd === 'insert') {
          out.push(obj.insert(a[0]));
        } else if (cmd === 'get_root') {
          function serializeTree(node) {
            if (!node) return [];
            const q = [node];
            const res = [];
            while (q.length > 0) {
              const cur = q.shift();
              if (cur) {
                res.push(cur.val);
                if (cur.left || cur.right || q.some(Boolean)) {
                  q.push(cur.left);
                  q.push(cur.right);
                }
              }
            }
            return res;
          }
          out.push(serializeTree(obj.get_root()));
        }
      }
      console.log(JSON.stringify(out));
    }
  }
}

module.exports = CBTInserter;
