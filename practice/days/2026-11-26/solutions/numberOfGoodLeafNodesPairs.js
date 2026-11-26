var countPairs = function(root, distance) {
  let ans = 0;
  function dfs(node) {
    if (!node) return null;
    if (!node.left && !node.right) {
      const cnt = new Int32Array(distance + 1);
      cnt[1] = 1;
      return cnt;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    if (left && right) {
      for (let i = 1; i <= distance; i++) {
        const maxJ = distance - i;
        for (let j = 1; j <= maxJ; j++) {
          ans += left[i] * right[j];
        }
      }
    }
    const res = new Int32Array(distance + 1);
    if (left) {
      for (let i = 1; i < distance; i++) res[i + 1] += left[i];
    }
    if (right) {
      for (let i = 1; i < distance; i++) res[i + 1] += right[i];
    }
    return res;
  }
  dfs(root);
  return ans;
};
var solve = countPairs;
if (require.main === module) {
  const fs = require('fs');
  function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
  function buildTree(arr) {
    if (!arr || !arr.length || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const cur = queue.shift();
      if (i < arr.length && arr[i] !== null) {
        cur.left = new TreeNode(arr[i]);
        queue.push(cur.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        cur.right = new TreeNode(arr[i]);
        queue.push(cur.right);
      }
      i++;
    }
    return root;
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
      } else if (raw[i] === '"' || raw[i] === "'") {
        const quote = raw[i], start = i;
        i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
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
    const tree = buildTree(parsed[0]);
    const res = countPairs(tree, parsed[1]);
    console.log(JSON.stringify(res));
  }
}
module.exports = countPairs;
