var TimeMap = function() {
  this.map = new Map();
};

TimeMap.prototype.set = function(key, value, timestamp) {
  if (!this.map.has(key)) this.map.set(key, []);
  this.map.get(key).push([timestamp, value]);
};

TimeMap.prototype.get = function(key, timestamp) {
  const arr = this.map.get(key);
  if (!arr || arr.length === 0) return '';
  let lo = 0, hi = arr.length - 1, res = '';
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid][0] <= timestamp) {
      res = arr[mid][1];
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return res;
};

// ---------------- LOCAL TEST HARNESS ----------------
function solve(operations, operands) {
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
}

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
