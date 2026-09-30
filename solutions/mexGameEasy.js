/**
 * Problem: MEX Game (Easy)
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(N) Time, O(N) Space per test case, O(sum N) total
 */

const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] >= 48 && buffer[offset] <= 57) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;

    const a = new Int32Array(n);
    let maxVal = 0;
    for (let i = 0; i < n; i++) {
      const val = nextInt();
      a[i] = val;
      if (val > maxVal) maxVal = val;
    }

    // Determine MEX of array A
    const limit = Math.min(n + 1, maxVal + 1);
    const present = new Uint8Array(limit + 1);
    for (let i = 0; i < n; i++) {
      if (a[i] <= limit) {
        present[a[i]] = 1;
      }
    }

    let m = 0;
    while (m <= limit && present[m]) {
      m++;
    }

    // Compute total number of moves:
    // Elements > M contribute A[i] - (M + 1)
    // Elements < M contribute A[i]
    // Terminal state of elements < M requires one copy of each {1, 2, ..., M - 1}
    let totalMoves = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] > m) {
        totalMoves += a[i] - (m + 1);
      } else if (a[i] < m) {
        totalMoves += a[i];
      }
    }
    totalMoves -= (m * (m - 1)) / 2;

    out.push((totalMoves % 2 !== 0) ? 'Alice' : 'Bob');
  }

  console.log(out.join('\n'));
}

solve();
