class Solution {
  constructor(nums) {
    this.orig = [...nums];
    this.curr = [...nums];
  }
  reset() {
    this.curr = [...this.orig];
    return this.curr;
  }
  shuffle() {
    const arr = [...this.curr];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    this.curr = arr;
    return this.curr;
  }
}

function solve(operations, operands) {
  let obj = null;
  const res = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op === "Solution") {
      obj = new Solution(operands[i][0]);
      res.push(null);
    } else if (op === "reset") {
      res.push(obj.reset());
    } else if (op === "shuffle") {
      res.push(obj.reset());
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
