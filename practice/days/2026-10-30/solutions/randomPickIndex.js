class Solution {
  constructor(nums) {
    this.map = new Map();
    for (let i = 0; i < nums.length; i++) {
      if (!this.map.has(nums[i])) this.map.set(nums[i], []);
      this.map.get(nums[i]).push(i);
    }
  }
  pick(target) {
    const indices = this.map.get(target);
    const rand = Math.floor(Math.random() * indices.length);
    return indices[rand];
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
    } else if (op === "pick") {
      res.push(obj.pick(operands[i][0]));
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
