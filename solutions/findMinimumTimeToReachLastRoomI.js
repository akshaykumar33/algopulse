var minTimeToReach = function(moveTime) {
  const n = moveTime.length;
  const m = moveTime[0].length;
  const dist = Array.from({ length: n }, () => new Int32Array(m).fill(2e9));
  dist[0][0] = 0;

  const heap = [[0, 0, 0]];

  function push(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[i][0] < heap[p][0]) {
        const tmp = heap[i];
        heap[i] = heap[p];
        heap[p] = tmp;
        i = p;
      } else break;
    }
  }

  function pop() {
    const top = heap[0];
    const bottom = heap.pop();
    if (heap.length > 0) {
      heap[0] = bottom;
      let i = 0;
      while ((i << 1) + 1 < heap.length) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let best = i;
        if (heap[left][0] < heap[best][0]) best = left;
        if (right < heap.length && heap[right][0] < heap[best][0]) best = right;
        if (best !== i) {
          const tmp = heap[i];
          heap[i] = heap[best];
          heap[best] = tmp;
          i = best;
        } else break;
      }
    }
    return top;
  }

  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (heap.length > 0) {
    const cur = pop();
    const t = cur[0];
    const r = cur[1];
    const c = cur[2];

    if (t > dist[r][c]) continue;
    if (r === n - 1 && c === m - 1) return t;

    for (let d = 0; d < 4; d++) {
      const nr = r + dirs[d][0];
      const nc = c + dirs[d][1];
      if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        const nt = Math.max(t, moveTime[nr][nc]) + 1;
        if (nt < dist[nr][nc]) {
          dist[nr][nc] = nt;
          push([nt, nr, nc]);
        }
      }
    }
  }

  return dist[n - 1][m - 1];
};

var solve = minTimeToReach;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minTimeToReach;
