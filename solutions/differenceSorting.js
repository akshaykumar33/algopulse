const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[ptr++], 10);
  const P = new Int32Array(n + 1);
  const pos = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    P[i] = parseInt(input[ptr++], 10);
    pos[P[i]] = i;
  }

  const heap = [];
  function push(d, x) {
    heap.push([d, x]);
    let i = heap.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (heap[i][0] < heap[p][0]) {
        let tmp = heap[i]; heap[i] = heap[p]; heap[p] = tmp;
        i = p;
      } else break;
    }
  }
  function pop() {
    if (heap.length === 0) return null;
    const top = heap[0];
    const end = heap.pop();
    if (heap.length > 0) {
      heap[0] = end;
      let i = 0;
      while ((i << 1) + 1 < heap.length) {
        let l = (i << 1) + 1, r = l + 1, best = l;
        if (r < heap.length && heap[r][0] < heap[l][0]) best = r;
        if (heap[best][0] < heap[i][0]) {
          let tmp = heap[i]; heap[i] = heap[best]; heap[best] = tmp;
          i = best;
        } else break;
      }
    }
    return top;
  }

  for (let x = 1; x <= n; x++) {
    const d = Math.abs(x - pos[x]);
    if (d > 0) push(d, x);
  }

  const swaps = [];
  while (heap.length > 0) {
    const item = pop();
    if (!item) break;
    const [d, x] = item;
    const curD = Math.abs(x - pos[x]);
    if (curD !== d || d === 0) continue;

    const idx1 = x;
    const idx2 = pos[x];
    const y = P[idx1];

    P[idx1] = x;
    P[idx2] = y;
    pos[x] = idx1;
    pos[y] = idx2;

    swaps.push(Math.min(idx1, idx2) + ' ' + Math.max(idx1, idx2));

    const newDy = Math.abs(y - pos[y]);
    if (newDy > 0) push(newDy, y);
  }

  out.push(swaps.length);
  for (let i = 0; i < swaps.length; i++) out.push(swaps[i]);
}
console.log(out.join('\n'));
