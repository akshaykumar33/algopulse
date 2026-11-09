const fs = require('fs');

class MaxHeap {
  constructor() {
    this.ages = [];
    this.ratings = [];
  }
  push(a, r) {
    let i = this.ages.length;
    this.ages.push(a);
    this.ratings.push(r);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.ages[i] > this.ages[p]) {
        this.swap(i, p);
        i = p;
      } else {
        break;
      }
    }
  }
  pop() {
    const topA = this.ages[0];
    const topR = this.ratings[0];
    const lastA = this.ages.pop();
    const lastR = this.ratings.pop();
    if (this.ages.length > 0) {
      this.ages[0] = lastA;
      this.ratings[0] = lastR;
      let i = 0;
      const len = this.ages.length;
      while ((i << 1) + 1 < len) {
        let l = (i << 1) + 1;
        let r = l + 1;
        let best = i;
        if (this.ages[l] > this.ages[best]) best = l;
        if (r < len && this.ages[r] > this.ages[best]) best = r;
        if (best !== i) {
          this.swap(i, best);
          i = best;
        } else {
          break;
        }
      }
    }
    return [topA, topR];
  }
  peek() {
    return this.ages[0];
  }
  size() {
    return this.ages.length;
  }
  swap(i, j) {
    let t = this.ages[i];
    this.ages[i] = this.ages[j];
    this.ages[j] = t;
    t = this.ratings[i];
    this.ratings[i] = this.ratings[j];
    this.ratings[j] = t;
  }
}

class MinHeap {
  constructor() {
    this.ages = [];
    this.ratings = [];
  }
  push(a, r) {
    let i = this.ages.length;
    this.ages.push(a);
    this.ratings.push(r);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.ages[i] < this.ages[p]) {
        this.swap(i, p);
        i = p;
      } else {
        break;
      }
    }
  }
  pop() {
    const topA = this.ages[0];
    const topR = this.ratings[0];
    const lastA = this.ages.pop();
    const lastR = this.ratings.pop();
    if (this.ages.length > 0) {
      this.ages[0] = lastA;
      this.ratings[0] = lastR;
      let i = 0;
      const len = this.ages.length;
      while ((i << 1) + 1 < len) {
        let l = (i << 1) + 1;
        let r = l + 1;
        let best = i;
        if (this.ages[l] < this.ages[best]) best = l;
        if (r < len && this.ages[r] < this.ages[best]) best = r;
        if (best !== i) {
          this.swap(i, best);
          i = best;
        } else {
          break;
        }
      }
    }
    return [topA, topR];
  }
  peek() {
    return this.ages[0];
  }
  size() {
    return this.ages.length;
  }
  swap(i, j) {
    let t = this.ages[i];
    this.ages[i] = this.ages[j];
    this.ages[j] = t;
    t = this.ratings[i];
    this.ratings[i] = this.ratings[j];
    this.ratings[j] = t;
  }
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const young = new MaxHeap();
  const old = new MinHeap();
  let youngSum = 0;
  let oldSum = 0;
  const out = [];

  for (let k = 1; k <= n; k++) {
    const a = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);

    if (young.size() === 0 || a <= young.peek()) {
      young.push(a, r);
      youngSum += r;
    } else {
      old.push(a, r);
      oldSum += r;
    }

    const targetYoung = Math.floor((k + 1) / 2);
    while (young.size() > targetYoung) {
      const [pa, pr] = young.pop();
      youngSum -= pr;
      old.push(pa, pr);
      oldSum += pr;
    }
    while (young.size() < targetYoung) {
      const [pa, pr] = old.pop();
      oldSum -= pr;
      young.push(pa, pr);
      youngSum += pr;
    }

    out.push(Math.abs(youngSum - oldSum));
  }

  console.log(out.join('\n'));
}

solve();
