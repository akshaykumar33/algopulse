function arrayToList(arr) {
  if (!arr || arr.length === 0) return null;
  const head = { val: arr[0], next: null };
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = { val: arr[i], next: null };
    cur = cur.next;
  }
  return head;
}

function arrayToTree(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const q = [root];
  let i = 1;
  while (q.length > 0 && i < arr.length) {
    const node = q.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = { val: arr[i], left: null, right: null };
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = { val: arr[i], left: null, right: null };
      q.push(node.right);
    }
    i++;
  }
  return root;
}

var isSubPath = function(head, root) {
  if (Array.isArray(head)) head = arrayToList(head);
  if (Array.isArray(root)) root = arrayToTree(root);

  function check(l, t) {
    if (!l) return true;
    if (!t) return false;
    if (l.val !== t.val) return false;
    return check(l.next, t.left) || check(l.next, t.right);
  }

  function dfs(t) {
    if (!t) return false;
    if (check(head, t)) return true;
    return dfs(t.left) || dfs(t.right);
  }

  return dfs(root);
};

var linkedListInBinaryTree = isSubPath;
var solve = typeof linkedListInBinaryTree !== 'undefined' ? linkedListInBinaryTree : null;

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
