class Solution {
  constructor(w) {
    this.pref = [];
    let sum = 0;
    for (let x of w) {
      sum += x;
      this.pref.push(sum);
    }
    this.total = sum;
  }

  pickIndex() {
    const target = Math.random() * this.total;
    let l = 0, r = this.pref.length - 1;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (this.pref[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }
}

var solve = function(commands, args) {
  let obj = null;
  let res = [];
  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "Solution") {
      obj = new Solution(args[i][0]);
      res.push(null);
    } else if (commands[i] === "pickIndex") {
      res.push(obj.pickIndex());
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length >= 2) {
      const cmds = JSON.parse(lines[0]);
      const args = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(cmds, args)));
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = Solution;
