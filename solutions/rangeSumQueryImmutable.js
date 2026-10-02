class NumArray {
  constructor(nums) {
    this.pref = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.pref[i + 1] = this.pref[i] + nums[i];
    }
  }

  sumRange(left, right) {
    return this.pref[right + 1] - this.pref[left];
  }
}

var solve = function(operations, operands) {
  let obj = null;
  let res = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "NumArray") {
      obj = new NumArray(operands[i][0]);
      res.push(null);
    } else if (operations[i] === "sumRange") {
      res.push(obj.sumRange(operands[i][0], operands[i][1]));
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
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed[0], parsed[1]);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
