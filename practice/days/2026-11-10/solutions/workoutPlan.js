const fs = require('fs');

class MinHeap {
  constructor() {
    this.data = [];
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
  up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i] < this.data[p]) {
        const tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else {
        break;
      }
    }
  }
  down(i) {
    const len = this.data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < len && this.data[left] < this.data[smallest]) {
        smallest = left;
      }
      if (right < len && this.data[right] < this.data[smallest]) {
        smallest = right;
      }
      if (smallest !== i) {
        const tmp = this.data[i];
        this.data[i] = this.data[smallest];
        this.data[smallest] = tmp;
        i = smallest;
      } else {
        break;
      }
    }
  }
  get size() {
    return this.data.length;
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokN = nextToken();
  if (!tokN) return;
  const n = parseInt(tokN, 10);
  let k = BigInt(nextToken());

  const x = [];
  for (let i = 0; i < n; i++) {
    x.push(BigInt(nextToken()));
  }

  const A = BigInt(nextToken());

  const c = [];
  for (let i = 0; i < n; i++) {
    c.push(BigInt(nextToken()));
  }

  const pq = new MinHeap();
  let totalCost = 0n;

  for (let i = 0; i < n; i++) {
    pq.push(c[i]);

    while (k < x[i] && pq.size > 0) {
      totalCost += pq.pop();
      k += A;
    }

    if (k < x[i]) {
      console.log(-1);
      return;
    }
  }

  console.log(totalCost.toString());
}

solve();
