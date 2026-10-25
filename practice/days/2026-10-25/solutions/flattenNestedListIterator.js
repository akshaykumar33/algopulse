class NestedIterator {
  constructor(nestedList) {
    this.vals = [];
    this.idx = 0;
    const flatten = (list) => {
      for (const item of list) {
        if (typeof item === 'number') {
          this.vals.push(item);
        } else if (Array.isArray(item)) {
          flatten(item);
        } else if (item && typeof item.isInteger === 'function') {
          if (item.isInteger()) this.vals.push(item.getInteger());
          else flatten(item.getList());
        }
      }
    };
    flatten(nestedList);
  }
  hasNext() {
    return this.idx < this.vals.length;
  }
  next() {
    return this.vals[this.idx++];
  }
}

var solve = function(nestedList) {
  const it = new NestedIterator(nestedList);
  const res = [];
  while (it.hasNext()) {
    res.push(it.next());
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
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = { NestedIterator, solve };
