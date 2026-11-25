var insertIntoMaxTree = function(root, val) {
  const node = new TreeNode(val);
  if (!root || val > root.val) {
    node.left = root;
    return node;
  }
  let cur = root;
  while (cur.right && cur.right.val > val) {
    cur = cur.right;
  }
  node.left = cur.right;
  cur.right = node;
  return root;
};
var solve = insertIntoMaxTree;
if (require.main === module) {
  const fs = require('fs');
  function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
  global.TreeNode = TreeNode;
  function arrayToTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const q = [root];
    let idx = 0, i = 1;
    while (idx < q.length && i < arr.length) {
      const cur = q[idx++];
      if (i < arr.length && arr[i] !== null) {
        cur.left = new TreeNode(arr[i]);
        q.push(cur.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        cur.right = new TreeNode(arr[i]);
        q.push(cur.right);
      }
      i++;
    }
    return root;
  }
  function treeToArray(root) {
    if (!root) return [];
    const res = [];
    const q = [root];
    let idx = 0;
    while (idx < q.length) {
      const cur = q[idx++];
      if (cur !== null) {
        res.push(cur.val);
        q.push(cur.left || null);
        q.push(cur.right || null);
      } else {
        res.push(null);
      }
    }
    while (res.length > 0 && res[res.length - 1] === null) res.pop();
    return res;
  }
  function parseArgs(raw) {
    raw = raw.trim();
    const args = [];
    let i = 0;
    while (i < raw.length) {
      while (i < raw.length && /\s/.test(raw[i])) i++;
      if (i >= raw.length) break;
      if (raw[i] === '[' || raw[i] === '{') {
        let depth = 0, start = i, inStr = false, quote = '';
        while (i < raw.length) {
          const c = raw[i];
          if (inStr) {
            if (c === '\\') i++;
            else if (c === quote) inStr = false;
          } else {
            if (c === '"' || c === "'") { inStr = true; quote = c; }
            else if (c === '[' || c === '{') depth++;
            else if (c === ']' || c === '}') {
              depth--;
              if (depth === 0) { i++; break; }
            }
          }
          i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        const start = i;
        while (i < raw.length && !/\s/.test(raw[i])) i++;
        const tok = raw.slice(start, i);
        if (tok === 'true') args.push(true);
        else if (tok === 'false') args.push(false);
        else if (tok === 'null') args.push(null);
        else if (!isNaN(Number(tok))) args.push(Number(tok));
        else args.push(tok);
      }
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    parsed[0] = arrayToTree(parsed[0]);
    const res = insertIntoMaxTree(...parsed);
    console.log(JSON.stringify(treeToArray(res)));
  }
}
module.exports = insertIntoMaxTree;
