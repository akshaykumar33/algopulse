var MyStack = function() {
    this.q1 = [];
    this.q2 = [];
};

MyStack.prototype.push = function(x) {
    this.q2.push(x);
    while (this.q1.length > 0) {
        this.q2.push(this.q1.shift());
    }
    let temp = this.q1;
    this.q1 = this.q2;
    this.q2 = temp;
};

MyStack.prototype.pop = function() {
    return this.q1.shift();
};

MyStack.prototype.top = function() {
    return this.q1[0];
};

MyStack.prototype.empty = function() {
    return this.q1.length === 0;
};

var solve = function(operations, values) {
    let stack = null;
    let res = [];
    for (let i = 0; i < operations.length; i++) {
        if (operations[i] === 'MyStack') {
            stack = new MyStack();
            res.push(null);
        } else if (operations[i] === 'push') {
            stack.push(values[i][0]);
            res.push(null);
        } else if (operations[i] === 'pop') {
            res.push(stack.pop());
        } else if (operations[i] === 'top') {
            res.push(stack.top());
        } else if (operations[i] === 'empty') {
            res.push(stack.empty());
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
      for (let i = 0; i < lines.length; i += 2) {
        const ops = JSON.parse(lines[i]);
        const vals = JSON.parse(lines[i + 1]);
        const result = solve(ops, vals);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
