const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T = readInt();
  if (T === null) return;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = readInt();
    const x = readInt();
    let y = readInt();
    if (n === null) break;

    const heap = new Int32Array(n + 1);
    let size = 0;

    function push(val) {
      heap[++size] = val;
      let i = size;
      while (i > 1) {
        const p = i >> 1;
        if (heap[i] < heap[p]) {
          const tmp = heap[i];
          heap[i] = heap[p];
          heap[p] = tmp;
          i = p;
        } else {
          break;
        }
      }
    }

    function pop() {
      const top = heap[1];
      heap[1] = heap[size--];
      let i = 1;
      while ((i << 1) <= size) {
        let child = i << 1;
        if (child + 1 <= size && heap[child + 1] < heap[child]) {
          child++;
        }
        if (heap[child] < heap[i]) {
          const tmp = heap[i];
          heap[i] = heap[child];
          heap[child] = tmp;
          i = child;
        } else {
          break;
        }
      }
      return top;
    }

    for (let i = 0; i < n; i++) {
      push(readInt());
    }

    while (y > 0) {
      const minVal = heap[1];
      const xorVal = minVal ^ x;
      if (xorVal > minVal) {
        pop();
        push(xorVal);
        y--;
      } else {
        if (y % 2 === 1) {
          heap[1] = xorVal;
        }
        break;
      }
    }

    const res = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      res[i] = heap[i + 1];
    }
    res.sort();
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
