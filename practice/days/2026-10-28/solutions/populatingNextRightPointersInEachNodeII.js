function _Node(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
}

const arrayToNodeTree = (arr) => {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = new _Node(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const cur = queue.shift();
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      cur.left = new _Node(arr[i]);
      queue.push(cur.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      cur.right = new _Node(arr[i]);
      queue.push(cur.right);
    }
    i++;
  }
  return root;
};

const nodeTreeToArrayWithNext = (root) => {
  if (!root) return [];
  const res = [];
  let leftmost = root;
  while (leftmost) {
    let curr = leftmost;
    leftmost = null;
    while (curr) {
      res.push(curr.val);
      if (!leftmost) {
        if (curr.left) leftmost = curr.left;
        else if (curr.right) leftmost = curr.right;
      }
      curr = curr.next;
    }
    res.push('#');
  }
  return res;
};

var connect = function(root) {
  if (!root) return null;
  let curr = root;
  while (curr) {
    const dummy = new _Node(0);
    let tail = dummy;
    while (curr) {
      if (curr.left) {
        tail.next = curr.left;
        tail = tail.next;
      }
      if (curr.right) {
        tail.next = curr.right;
        tail = tail.next;
      }
      curr = curr.next;
    }
    curr = dummy.next;
  }
  return root;
};

var solve = function(arr) {
  const root = Array.isArray(arr) ? arrayToNodeTree(arr) : arr;
  const connected = connect(root);
  return nodeTreeToArrayWithNext(connected);
};

// ---------------- LOCAL TEST HARNESS ----------------
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

