var MyQueue = function() {
    this.inStack = [];
    this.outStack = [];
};

MyQueue.prototype.push = function(x) {
    this.inStack.push(x);
};

MyQueue.prototype.pop = function() {
    this.peek();
    return this.outStack.pop();
};

MyQueue.prototype.peek = function() {
    if (this.outStack.length === 0) {
        while (this.inStack.length > 0) {
            this.outStack.push(this.inStack.pop());
        }
    }
    return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function() {
    return this.inStack.length === 0 && this.outStack.length === 0;
};

var solve = function(ops, vals) {
    let q = null;
    let res = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "MyQueue") {
            q = new MyQueue();
            res.push(null);
        } else if (ops[i] === "push") {
            q.push(vals[i][0]);
            res.push(null);
        } else if (ops[i] === "pop") {
            res.push(q.pop());
        } else if (ops[i] === "peek") {
            res.push(q.peek());
        } else if (ops[i] === "empty") {
            res.push(q.empty());
        }
    }
    return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let ops = JSON.parse(lines[0]);
      let vals = JSON.parse(lines[1]);
      const result = solve(ops, vals);
      console.log(JSON.stringify(result));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
