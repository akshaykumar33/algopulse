const fs = require('fs');

class MinHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      const tmp = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = tmp;
      i = p;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = last;
      let i = 0;
      while (true) {
        let best = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < this.h.length && this.h[l] < this.h[best]) best = l;
        if (r < this.h.length && this.h[r] < this.h[best]) best = r;
        if (best === i) break;
        const tmp = this.h[i];
        this.h[i] = this.h[best];
        this.h[best] = tmp;
        i = best;
      }
    }
    return top;
  }
  peek() {
    return this.h.length === 0 ? null : this.h[0];
  }
}

class MaxHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] >= this.h[i]) break;
      const tmp = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = tmp;
      i = p;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = last;
      let i = 0;
      while (true) {
        let best = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < this.h.length && this.h[l] > this.h[best]) best = l;
        if (r < this.h.length && this.h[r] > this.h[best]) best = r;
        if (best === i) break;
        const tmp = this.h[i];
        this.h[i] = this.h[best];
        this.h[best] = tmp;
        i = best;
      }
    }
    return top;
  }
  peek() {
    return this.h.length === 0 ? null : this.h[0];
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const q = parseInt(input[ptr++], 10);

  const leftMax = new MaxHeap();
  const leftDel = new Map();
  const rightMin = new MinHeap();
  const rightDel = new Map();

  const out = [];

  for (let i = 0; i < q; i++) {
    const type = input[ptr++];
    const l = parseInt(input[ptr++], 10);
    const r = parseInt(input[ptr++], 10);

    if (type === '+') {
      leftMax.push(l);
      rightMin.push(r);
    } else {
      leftDel.set(l, (leftDel.get(l) || 0) + 1);
      rightDel.set(r, (rightDel.get(r) || 0) + 1);
    }

    while (leftMax.peek() !== null && leftDel.get(leftMax.peek())) {
      const top = leftMax.pop();
      leftDel.set(top, leftDel.get(top) - 1);
    }
    while (rightMin.peek() !== null && rightDel.get(rightMin.peek())) {
      const top = rightMin.pop();
      rightDel.set(top, rightDel.get(top) - 1);
    }

    if (leftMax.peek() !== null && rightMin.peek() !== null && leftMax.peek() > rightMin.peek()) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}

solve();
