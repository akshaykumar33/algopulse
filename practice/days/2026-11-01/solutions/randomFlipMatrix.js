class Solution {
    constructor(m, n) {
        this.m = m;
        this.n = n;
        this.total = m * n;
        this.map = new Map();
    }

    flip() {
        const r = Math.floor(Math.random() * this.total);
        this.total--;
        const idx = this.map.get(r) ?? r;
        const replace = this.map.get(this.total) ?? this.total;
        this.map.set(r, replace);
        return [Math.floor(idx / this.n), idx % this.n];
    }

    reset() {
        this.map.clear();
        this.total = this.m * this.n;
    }
}

var solve = function(actions, values) {
    let obj = null;
    let res = [];
    for (let i = 0; i < actions.length; i++) {
        if (actions[i] === 'Solution') {
            obj = new Solution(values[i][0], values[i][1]);
            res.push(null);
        } else if (actions[i] === 'flip') {
            res.push(obj.flip());
        } else if (actions[i] === 'reset') {
            obj.reset();
            res.push(null);
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
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = Solution;

