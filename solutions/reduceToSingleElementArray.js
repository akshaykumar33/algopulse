const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(input[ptr++], 10));
    }
    
    arr.sort((a, b) => a - b);
    
    let heap = [...arr];
    
    function push(val) {
      heap.push(val);
      let idx = heap.length - 1;
      while (idx > 0) {
        let p = (idx - 1) >> 1;
        if (heap[p] > heap[idx]) {
          let tmp = heap[p];
          heap[p] = heap[idx];
          heap[idx] = tmp;
          idx = p;
        } else {
          break;
        }
      }
    }
    
    function pop() {
      if (heap.length === 1) return heap.pop();
      let res = heap[0];
      heap[0] = heap.pop();
      let idx = 0;
      let len = heap.length;
      while ((idx << 1) + 1 < len) {
        let left = (idx << 1) + 1;
        let right = left + 1;
        let smallest = idx;
        
        if (heap[left] < heap[smallest]) smallest = left;
        if (right < len && heap[right] < heap[smallest]) smallest = right;
        
        if (smallest !== idx) {
          let tmp = heap[idx];
          heap[idx] = heap[smallest];
          heap[smallest] = tmp;
          idx = smallest;
        } else {
          break;
        }
      }
      return res;
    }
    
    heap = [];
    for (let x of arr) {
      push(x);
    }
    
    let totalCost = 0;
    while (heap.length > 1) {
      let first = pop();
      let second = pop();
      let sum = first + second;
      totalCost += sum;
      push(sum);
    }
    
    out.push(totalCost);
  }
  
  console.log(out.join('\n'));
}

solve();
