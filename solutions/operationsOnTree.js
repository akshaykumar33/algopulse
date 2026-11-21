var LockingTree = function(parent) {
  this.parent = parent;
  this.n = parent.length;
  this.lockedBy = new Int32Array(this.n).fill(-1);
  this.children = Array.from({ length: this.n }, () => []);
  for (let i = 1; i < this.n; i++) {
    this.children[parent[i]].push(i);
  }
};

LockingTree.prototype.lock = function(num, user) {
  if (this.lockedBy[num] !== -1) return false;
  this.lockedBy[num] = user;
  return true;
};

LockingTree.prototype.unlock = function(num, user) {
  if (this.lockedBy[num] !== user) return false;
  this.lockedBy[num] = -1;
  return true;
};

LockingTree.prototype.upgrade = function(num, user) {
  if (this.lockedBy[num] !== -1) return false;
  let cur = this.parent[num];
  while (cur !== -1) {
    if (this.lockedBy[cur] !== -1) return false;
    cur = this.parent[cur];
  }
  let hasLockedDesc = false;
  const lockedDescendants = [];
  const q = [...this.children[num]];
  while (q.length > 0) {
    const u = q.shift();
    if (this.lockedBy[u] !== -1) {
      hasLockedDesc = true;
      lockedDescendants.push(u);
    }
    for (const v of this.children[u]) q.push(v);
  }
  if (!hasLockedDesc) return false;
  this.lockedBy[num] = user;
  for (const d of lockedDescendants) {
    this.lockedBy[d] = -1;
  }
  return true;
};

function runLockingTree(ops, args) {
  let tree = null;
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const a = args[i];
    if (op === 'LockingTree') {
      tree = new LockingTree(a[0]);
      out.push(null);
    } else if (op === 'lock') {
      out.push(tree.lock(a[0], a[1]));
    } else if (op === 'unlock') {
      out.push(tree.unlock(a[0], a[1]));
    } else if (op === 'upgrade') {
      out.push(tree.upgrade(a[0], a[1]));
    }
  }
  return out;
}

var solve = runLockingTree;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = LockingTree;