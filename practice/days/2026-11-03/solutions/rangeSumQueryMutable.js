class NumArray {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(this.n * 2).fill(0);
    this.nums = new Array(this.n).fill(0);
    for (let i = 0; i < this.n; i++) {
      this.update(i, nums[i]);
    }
  }

  update(index, val) {
    let diff = val - this.nums[index];
    this.nums[index] = val;
    let pos = index + this.n;
    while (pos > 0) {
      this.tree[pos] += diff;
      pos = Math.floor(pos / 2);
    }
  }

  sumRange(left, right) {
    let l = left + this.n;
    let r = right + this.n;
    let sum = 0;
    while (l <= r) {
      if (l % 2 === 1) {
        sum += this.tree[l];
        l++;
      }
      if (r % 2 === 0) {
        sum += this.tree[r];
        r--;
      }
      l = Math.floor(l / 2);
      r = Math.floor(r / 2);
    }
    return sum;
  }
}

var rangeSumQueryMutable = function(commands, args) {
  let obj = null;
  let res = [];
  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "NumArray") {
      obj = new NumArray(args[i][0]);
      res.push(null);
    } else if (commands[i] === "update") {
      obj.update(args[i][0], args[i][1]);
      res.push(null);
    } else if (commands[i] === "sumRange") {
      res.push(obj.sumRange(args[i][0], args[i][1]));
    }
  }
  return res;
};

var solve = rangeSumQueryMutable;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const commands = JSON.parse(lines[0]);
      const args = JSON.parse(lines[1]);
      const result = solve(commands, args);
      console.log(JSON.stringify(result));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
