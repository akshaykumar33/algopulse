function makeNode(val) {
  if (typeof TreeNode !== 'undefined') return new TreeNode(val);
  return { val, left: null, right: null };
}

function deserialize(data) {
  if (!data || !data.length || data[0] === -1) return null;
  const root = makeNode(data[0]);
  const q = [root];
  let head = 0;
  let idx = 1;
  while (head < q.length && idx < data.length) {
    const cur = q[head++];
    if (idx < data.length) {
      const v = data[idx++];
      if (v !== -1) {
        cur.left = makeNode(v);
        q.push(cur.left);
      }
    }
    if (idx < data.length) {
      const v = data[idx++];
      if (v !== -1) {
        cur.right = makeNode(v);
        q.push(cur.right);
      }
    }
  }
  return root;
}

function serialize(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  let head = 0;
  while (head < q.length) {
    const cur = q[head++];
    if (cur === null) {
      res.push(-1);
    } else {
      res.push(cur.val);
      q.push(cur.left);
      q.push(cur.right);
    }
  }
  while (res.length > 0 && res[res.length - 1] === -1) res.pop();
  return res;
}

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (input) {
    const tokens = input.split(/\s+/);
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
      const n = parseInt(tokens[ptr++], 10);
      const data = new Array(n);
      for (let i = 0; i < n; i++) data[i] = parseInt(tokens[ptr++], 10);
      const root = deserialize(data);
      out.push(serialize(root).join(' '));
    }
    console.log(out.join('\n'));
  }
}
