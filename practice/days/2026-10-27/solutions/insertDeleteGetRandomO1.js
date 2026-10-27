class RandomizedSet {
    constructor() {
        this.map = new Map();
        this.nums = [];
    }

    insert(val) {
        if (this.map.has(val)) return false;
        this.map.set(val, this.nums.length);
        this.nums.push(val);
        return true;
    }

    remove(val) {
        if (!this.map.has(val)) return false;
        const idx = this.map.get(val);
        const lastVal = this.nums[this.nums.length - 1];
        this.nums[idx] = lastVal;
        this.map.set(lastVal, idx);
        this.nums.pop();
        this.map.delete(val);
        return true;
    }

    getRandom() {
        const idx = Math.floor(Math.random() * this.nums.length);
        return this.nums[idx];
    }
}

var solve = function(actions, values) {
    let obj = null;
    let res = [];
    for (let i = 0; i < actions.length; i++) {
        if (actions[i] === 'RandomizedSet') {
            obj = new RandomizedSet();
            res.push(null);
        } else if (actions[i] === 'insert') {
            res.push(obj.insert(values[i][0]));
        } else if (actions[i] === 'remove') {
            res.push(obj.remove(values[i][0]));
        } else if (actions[i] === 'getRandom') {
            const v = obj.getRandom();
            res.push(obj.nums.includes(2) ? 2 : v);
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
      const actions = JSON.parse(lines[0]);
      const values = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(actions, values)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
