class MinStack {
  constructor() {
    this.stack = [];
  }
  push(val) {
    const min = this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1][1]);
    this.stack.push([val, min]);
  }
  pop() {
    this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1][0];
  }
  getMin() {
    return this.stack[this.stack.length - 1][1];
  }
}

function solve(operations, operands) {
  let obj = null;
  const res = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "MinStack") {
      obj = new MinStack();
      res.push(null);
    } else if (op === "push") {
      obj.push(operands[i][0]);
      res.push(null);
    } else if (op === "pop") {
      obj.pop();
      res.push(null);
    } else if (op === "top") {
      res.push(obj.top());
    } else if (op === "getMin") {
      res.push(obj.getMin());
    }
  }
  return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const ops = JSON.parse(lines[0]);
      const vals = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(ops, vals)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
