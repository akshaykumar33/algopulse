var maximumNumberOfEatenApples = function(apples, days) {
  const heap = [];
  function push(item) {
    heap.push(item);
    let idx = heap.length - 1;
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (heap[p][0] > heap[idx][0]) {
        const tmp = heap[p];
        heap[p] = heap[idx];
        heap[idx] = tmp;
        idx = p;
      } else {
        break;
      }
    }
  }

  function pop() {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      let idx = 0;
      while (true) {
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        let smallest = idx;
        if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
        if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
        if (smallest !== idx) {
          const tmp = heap[idx];
          heap[idx] = heap[smallest];
          heap[smallest] = tmp;
          idx = smallest;
        } else {
          break;
        }
      }
    }
    return top;
  }

  let eaten = 0;
  let day = 0;
  const n = apples.length;
  while (day < n || heap.length > 0) {
    if (day < n && apples[day] > 0) {
      push([day + days[day], apples[day]]);
    }
    while (heap.length > 0 && heap[0][0] <= day) {
      pop();
    }
    if (heap.length > 0) {
      heap[0][1]--;
      eaten++;
      if (heap[0][1] === 0) pop();
    }
    day++;
  }

  return eaten;
};

var solve = typeof maximumNumberOfEatenApples !== 'undefined' ? maximumNumberOfEatenApples : null;

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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

