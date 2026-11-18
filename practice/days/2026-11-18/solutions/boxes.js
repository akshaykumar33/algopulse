const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readBigIntArray = () => readLine().trim().split(/\s+/).map(BigInt);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

class MaxHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.heap[p] < this.heap[i]) {
        let t = this.heap[p];
        this.heap[p] = this.heap[i];
        this.heap[i] = t;
        i = p;
      } else break;
    }
  }
  pop() {
    if (this.heap.length === 0) return null;
    let top = this.heap[0];
    let bot = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bot;
      let i = 0, n = this.heap.length;
      while (true) {
        let left = 2 * i + 1, right = 2 * i + 2, best = i;
        if (left < n && this.heap[left] > this.heap[best]) best = left;
        if (right < n && this.heap[right] > this.heap[best]) best = right;
        if (best !== i) {
          let t = this.heap[i];
          this.heap[i] = this.heap[best];
          this.heap[best] = t;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  size() {
    return this.heap.length;
  }
}

function solveCase(n, a) {
  a.sort((x, y) => (x > y ? -1 : x < y ? 1 : 0));
  let heap = new MaxHeap();
  for (let i = 0; i < n; i++) {
    let x = a[i];
    if (heap.size() === 0 || heap.peek() < x) {
      heap.push(x);
    } else {
      let top = heap.pop();
      heap.push(top ^ x);
    }
  }
  return heap.size();
}

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = readBigIntArray();
    print(solveCase(n, a));
  }
}

solve();
printAll();
