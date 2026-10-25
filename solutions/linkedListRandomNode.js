class Solution {
  constructor(head) {
    this.vals = [];
    if (Array.isArray(head)) {
      this.vals = head.slice();
    } else {
      let cur = head;
      while (cur) {
        this.vals.push(cur.val !== undefined ? cur.val : cur);
        cur = cur.next;
      }
    }
  }

  getRandom() {
    let idx = Math.floor(Math.random() * this.vals.length);
    return this.vals[idx];
  }
}

var solve = function(actions, values) {
  let sol = null;
  let res = [];
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === "Solution") {
      sol = new Solution(values[i][0]);
      res.push(null);
    } else if (actions[i] === "getRandom") {
      res.push(sol.getRandom());
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
        const actions = JSON.parse(lines[i]);
        const values = JSON.parse(lines[i + 1]);
        const result = solve(actions, values);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = { Solution, solve };
