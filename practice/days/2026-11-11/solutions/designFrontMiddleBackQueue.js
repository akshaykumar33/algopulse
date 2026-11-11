var FrontMiddleBackQueue = function() {
  this.left = { head: null, tail: null, len: 0 };
  this.right = { head: null, tail: null, len: 0 };
};

FrontMiddleBackQueue.prototype._pushFront = function(dq, val) {
  const node = { val, prev: null, next: dq.head };
  if (dq.head) dq.head.prev = node;
  else dq.tail = node;
  dq.head = node;
  dq.len++;
};

FrontMiddleBackQueue.prototype._pushBack = function(dq, val) {
  const node = { val, prev: dq.tail, next: null };
  if (dq.tail) dq.tail.next = node;
  else dq.head = node;
  dq.tail = node;
  dq.len++;
};

FrontMiddleBackQueue.prototype._popFront = function(dq) {
  if (dq.len === 0) return -1;
  const node = dq.head;
  dq.head = node.next;
  if (dq.head) dq.head.prev = null;
  else dq.tail = null;
  dq.len--;
  return node.val;
};

FrontMiddleBackQueue.prototype._popBack = function(dq) {
  if (dq.len === 0) return -1;
  const node = dq.tail;
  dq.tail = node.prev;
  if (dq.tail) dq.tail.next = null;
  else dq.head = null;
  dq.len--;
  return node.val;
};

FrontMiddleBackQueue.prototype._balance = function() {
  while (this.left.len > this.right.len) {
    this._pushFront(this.right, this._popBack(this.left));
  }
  while (this.right.len > this.left.len + 1) {
    this._pushBack(this.left, this._popFront(this.right));
  }
};

FrontMiddleBackQueue.prototype.pushFront = function(val) {
  this._pushFront(this.left, val);
  this._balance();
};

FrontMiddleBackQueue.prototype.pushMiddle = function(val) {
  if (this.left.len === this.right.len) {
    this._pushFront(this.right, val);
  } else {
    this._pushBack(this.left, val);
  }
};

FrontMiddleBackQueue.prototype.pushBack = function(val) {
  this._pushBack(this.right, val);
  this._balance();
};

FrontMiddleBackQueue.prototype.popFront = function() {
  if (this.right.len === 0) return -1;
  const val = this.left.len > 0 ? this._popFront(this.left) : this._popFront(this.right);
  this._balance();
  return val;
};

FrontMiddleBackQueue.prototype.popMiddle = function() {
  if (this.right.len === 0) return -1;
  if (this.left.len === this.right.len) {
    return this._popBack(this.left);
  }
  return this._popFront(this.right);
};

FrontMiddleBackQueue.prototype.popBack = function() {
  if (this.right.len === 0) return -1;
  const val = this._popBack(this.right);
  this._balance();
  return val;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i + 1 < lines.length; i += 2) {
      const cmds = JSON.parse(lines[i]);
      const args = JSON.parse(lines[i + 1]);
      let obj = null;
      const out = [];
      for (let j = 0; j < cmds.length; j++) {
        const cmd = cmds[j];
        const a = args[j];
        if (cmd === 'FrontMiddleBackQueue') {
          obj = new FrontMiddleBackQueue(...a);
          out.push(null);
        } else {
          const res = obj[cmd](...a);
          out.push(res === undefined ? null : res);
        }
      }
      console.log(JSON.stringify(out));
    }
  }
}
