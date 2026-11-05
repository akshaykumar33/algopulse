var SnapshotArray = function(length) {
    this.curSnap = 0;
    this.history = new Array(length);
    for (let i = 0; i < length; i++) {
        this.history[i] = [[0, 0]];
    }
};

SnapshotArray.prototype.set = function(index, val) {
    const arr = this.history[index];
    const last = arr[arr.length - 1];
    if (last[0] === this.curSnap) {
        last[1] = val;
    } else {
        arr.push([this.curSnap, val]);
    }
};

SnapshotArray.prototype.snap = function() {
    return this.curSnap++;
};

SnapshotArray.prototype.get = function(index, snap_id) {
    const arr = this.history[index];
    let low = 0;
    let high = arr.length - 1;
    let ans = 0;
    while (low <= high) {
        const mid = (low + high) >> 1;
        if (arr[mid][0] <= snap_id) {
            ans = arr[mid][1];
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
};

var solve = SnapshotArray;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const ops = JSON.parse(lines[0]);
      const args = JSON.parse(lines[1]);
      let obj = null;
      const res = [];
      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "SnapshotArray") {
          obj = new solve(args[i][0]);
          res.push(null);
        } else if (ops[i] === "set") {
          obj.set(args[i][0], args[i][1]);
          res.push(null);
        } else if (ops[i] === "snap") {
          res.push(obj.snap());
        } else if (ops[i] === "get") {
          res.push(obj.get(args[i][0], args[i][1]));
        }
      }
      console.log(JSON.stringify(res));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

