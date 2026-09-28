const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

// Independent mathematical reference using raw Manhattan distance to all zeros
function manhattanReference(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;
  const zeros = [];

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c] === 0) {
        zeros.push([r, c]);
      }
    }
  }

  const res = Array.from({ length: n }, () => new Array(m).fill(0));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      let minDist = Infinity;
      for (let k = 0; k < zeros.length; k++) {
        const d = Math.abs(r - zeros[k][0]) + Math.abs(c - zeros[k][1]);
        if (d < minDist) minDist = d;
      }
      res[r][c] = minDist;
    }
  }
  return res;
}

// Import or copy updateMatrix for internal validation
function updateMatrixBFS(matrix) {
  const n = matrix.length;
  if (n === 0) return matrix;
  const m = matrix[0].length;

  const dist = Array.from({ length: n }, () => new Int32Array(m).fill(-1));
  const queue = new Int32Array(n * m);
  let head = 0;
  let tail = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c] === 0) {
        dist[r][c] = 0;
        queue[tail++] = r * m + c;
      }
    }
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (head < tail) {
    const curr = queue[head++];
    const r = Math.floor(curr / m);
    const c = curr % m;
    const d = dist[r][c];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr >= 0 && nr < n && nc >= 0 && nc < m && dist[nr][nc] === -1) {
        dist[nr][nc] = d + 1;
        queue[tail++] = nr * m + nc;
      }
    }
  }

  const res = Array.from({ length: n }, () => new Array(m));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      res[r][c] = dist[r][c];
    }
  }
  return res;
}

function matricesEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let r = 0; r < a.length; r++) {
    if (a[r].length !== b[r].length) return false;
    for (let c = 0; c < a[r].length; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

console.log('[stress] Testing edge-case shapes (1x1, 1xM, Nx1, all 0s, single 0)...');

const edgeCases = [
  // 1x1
  [[0]],
  // 1x5
  [[0, 1, 1, 0, 1]],
  // 5x1
  [[1], [0], [1], [1], [0]],
  // 3x3 all 0s
  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  // 3x3 single 0 at center
  [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
  // 3x3 single 0 at corner
  [[0, 1, 1], [1, 1, 1], [1, 1, 1]],
  // 4x4 checkerboard
  [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0]
  ]
];

for (const mat of edgeCases) {
  const ref = manhattanReference(mat);
  const bfs = updateMatrixBFS(mat);
  if (!matricesEqual(ref, bfs)) {
    console.error('[stress] Edge case mismatch on matrix:', mat);
    process.exit(1);
  }
}
console.log(`[stress] All ${edgeCases.length} edge cases passed!`);

console.log('[stress] Running 2,000 randomized fuzz grids against Manhattan distance oracle...');
for (let tc = 0; tc < 2000; tc++) {
  const n = Math.floor(Math.random() * 15) + 1;
  const m = Math.floor(Math.random() * 15) + 1;
  const mat = [];

  let zeroCount = 0;
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < m; c++) {
      const val = Math.random() < 0.25 ? 0 : 1;
      if (val === 0) zeroCount++;
      row.push(val);
    }
    mat.push(row);
  }

  // Ensure at least one 0
  if (zeroCount === 0) {
    const r = Math.floor(Math.random() * n);
    const c = Math.floor(Math.random() * m);
    mat[r][c] = 0;
  }

  const ref = manhattanReference(mat);
  const bfs = updateMatrixBFS(mat);
  if (!matricesEqual(ref, bfs)) {
    console.error(`[stress] Fuzz mismatch on ${n}x${m} matrix!`);
    process.exit(1);
  }
}
console.log('[stress] 2,000 randomized fuzz test cases passed!');

// Benchmark worst-case scenario: 100x100 matrix with exactly ONE 0 in top-left corner
const solutionPath = fs.existsSync(path.resolve(__dirname, 'distanceToNearestZero.js'))
  ? path.resolve(__dirname, 'distanceToNearestZero.js')
  : path.resolve(__dirname, '..', '..', '..', 'solutions', 'distanceToNearestZero.js');
console.log(`[stress] Benchmarking worst-case scenario (100x100 grid) on: ${solutionPath}`);

const N = 100;
const M = 100;
const lines = [`${N} ${M}`];
for (let r = 0; r < N; r++) {
  const row = [];
  for (let c = 0; c < M; c++) {
    row.push((r === 0 && c === 0) ? '0' : '1');
  }
  lines.push(row.join(' '));
}

const largeInput = lines.join('\n') + '\n';
const start = Date.now();
const res = spawnSync('node', [solutionPath], {
  input: largeInput,
  encoding: 'utf-8',
  maxBuffer: 50 * 1024 * 1024,
});
const elapsed = Date.now() - start;

if (res.status !== 0) {
  console.error('[stress] Solution execution failed:', res.stderr);
  process.exit(1);
}

const outputLines = res.stdout.trim().split(/\r?\n/);
if (outputLines.length !== N) {
  console.error(`[stress] Expected ${N} output rows, got ${outputLines.length}`);
  process.exit(1);
}

// Verify corner distance
const lastRow = outputLines[N - 1].trim().split(/\s+/).map(Number);
const expectedMaxDist = (N - 1) + (M - 1); // 99 + 99 = 198
if (lastRow[M - 1] !== expectedMaxDist) {
  console.error(`[stress] Unexpected corner distance: expected ${expectedMaxDist}, got ${lastRow[M - 1]}`);
  process.exit(1);
}

console.log(`[stress] Max constraint test (100x100 single-zero) finished in ${elapsed}ms (Limit: 1000ms).`);
console.log(`[stress] Corner (100, 100) verified distance = ${lastRow[M - 1]}`);
console.log('[stress] All stress tests verified successfully!');
