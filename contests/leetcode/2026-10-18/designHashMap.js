var MyHashMap = function() {
    this.size = 1999;
    this.buckets = Array.from({ length: this.size }, () => []);
};

MyHashMap.prototype.hash = function(key) {
    return key % this.size;
};

MyHashMap.prototype.put = function(key, value) {
    let idx = this.hash(key);
    let bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
            bucket[i][1] = value;
            return;
        }
    }
    bucket.push([key, value]);
};

MyHashMap.prototype.get = function(key) {
    let idx = this.hash(key);
    let bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
            return bucket[i][1];
        }
    }
    return -1;
};

MyHashMap.prototype.remove = function(key) {
    let idx = this.hash(key);
    let bucket = this.buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
            bucket.splice(i, 1);
            return;
        }
    }
};

var solve = function(actions, values) {
    let obj = null;
    let res = [];
    for (let i = 0; i < actions.length; i++) {
        if (actions[i] === "MyHashMap") {
            obj = new MyHashMap();
            res.push(null);
        } else if (actions[i] === "put") {
            obj.put(values[i][0], values[i][1]);
            res.push(null);
        } else if (actions[i] === "get") {
            res.push(obj.get(values[i][0]));
        } else if (actions[i] === "remove") {
            obj.remove(values[i][0]);
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
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
