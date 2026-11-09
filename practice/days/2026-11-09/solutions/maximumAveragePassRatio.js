class FastMaxHeap {
  constructor(arr) {
    this.data = arr || [];
    for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
      this.down(i);
    }
  }
  push(val) {
    this.data.push(val);
    this.up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this.down(0);
    }
    return top;
  }
  up(idx) {
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (this.data[idx][0] > this.data[p][0]) {
        const tmp = this.data[idx];
        this.data[idx] = this.data[p];
        this.data[p] = tmp;
        idx = p;
      } else {
        break;
      }
    }
  }
  down(idx) {
    const len = this.data.length;
    while ((idx << 1) + 1 < len) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let best = idx;
      if (this.data[left][0] > this.data[best][0]) best = left;
      if (right < len && this.data[right][0] > this.data[best][0]) best = right;
      if (best !== idx) {
        const tmp = this.data[idx];
        this.data[idx] = this.data[best];
        this.data[best] = tmp;
        idx = best;
      } else {
        break;
      }
    }
  }
}

var maxAverageRatio = function(classes, extraStudents) {
  const initial = [];
  for (let i = 0; i < classes.length; i++) {
    const p = classes[i][0];
    const t = classes[i][1];
    const gain = (p + 1) / (t + 1) - p / t;
    initial.push([gain, p, t]);
  }
  const heap = new FastMaxHeap(initial);
  for (let k = 0; k < extraStudents; k++) {
    const top = heap.pop();
    const p = top[1] + 1;
    const t = top[2] + 1;
    const gain = (p + 1) / (t + 1) - p / t;
    heap.push([gain, p, t]);
  }
  let sum = 0;
  for (let i = 0; i < heap.data.length; i++) {
    sum += heap.data[i][1] / heap.data[i][2];
  }
  return sum / classes.length;
};

var solve = maxAverageRatio;

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
  } catch (err) {}
}

module.exports = solve;
