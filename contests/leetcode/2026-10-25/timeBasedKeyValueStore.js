class TimeMap {
  constructor() {
    this.map = new Map();
  }

  set(key, val, time) {
    if (!this.map.has(key)) this.map.set(key, []);
    this.map.get(key).push([time, val]);
  }

  get(key, time) {
    const arr = this.map.get(key);
    if (!arr || arr.length === 0) return '';
    let lo = 0, hi = arr.length - 1, res = '';
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid][0] <= time) {
        res = arr[mid][1];
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return res;
  }
}

var solve = function(operations, operands) {
  let obj = null;
  const res = [];
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const args = operands[i];
    if (op === "TimeMap") {
      obj = new TimeMap();
      res.push(null);
    } else if (op === "set") {
      obj.set(args[0], args[1], args[2]);
      res.push(null);
    } else if (op === "get") {
      res.push(obj.get(args[0], args[1]));
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = { TimeMap, solve };
