class CustomMinHeap {
  constructor() {
    this.h = [];
  }
  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] > this.h[i]) {
        let t = this.h[p];
        this.h[p] = this.h[i];
        this.h[i] = t;
        i = p;
      } else break;
    }
  }
  pop() {
    if (!this.h.length) return null;
    let top = this.h[0];
    let end = this.h.pop();
    if (this.h.length) {
      this.h[0] = end;
      let i = 0, n = this.h.length;
      while ((i << 1) + 1 < n) {
        let l = (i << 1) + 1, r = l + 1, best = l;
        if (r < n && this.h[r] < this.h[l]) best = r;
        if (this.h[best] < this.h[i]) {
          let t = this.h[best];
          this.h[best] = this.h[i];
          this.h[i] = t;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.h[0] ?? null;
  }
  get size() {
    return this.h.length;
  }
}

var NumberContainers = function() {
  this.idxToNum = new Map();
  this.numToHeap = new Map();
};

NumberContainers.prototype.change = function(idx, num) {
  this.idxToNum.set(idx, num);
  if (!this.numToHeap.has(num)) {
    this.numToHeap.set(num, new CustomMinHeap());
  }
  this.numToHeap.get(num).push(idx);
};

NumberContainers.prototype.find = function(num) {
  if (!this.numToHeap.has(num)) return -1;
  const h = this.numToHeap.get(num);
  while (h.size > 0) {
    let top = h.peek();
    if (this.idxToNum.get(top) === num) return top;
    h.pop();
  }
  return -1;
};

var solve = function(actions, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === "NumberContainers") {
      obj = new NumberContainers();
      res.push(null);
    } else if (actions[i] === "change") {
      obj.change(...args[i]);
      res.push(null);
    } else if (actions[i] === "find") {
      res.push(obj.find(...args[i]));
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = NumberContainers;
