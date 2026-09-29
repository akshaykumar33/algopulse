// Exhaustive BFS verification for minQueenMoves across all 64 * 64 board configurations
function bfsQueen(sr, sc, tr, tc) {
  if (sr === tr && sc === tc) return 0;
  const queue = [[sr, sc, 0]];
  const visited = Array.from({ length: 9 }, () => Array(9).fill(false));
  visited[sr][sc] = true;

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ];

  while (queue.length > 0) {
    const [r, c, d] = queue.shift();
    if (r === tr && c === tc) return d;

    for (const [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;
      while (nr >= 1 && nr <= 8 && nc >= 1 && nc <= 8) {
        if (!visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc, d + 1]);
        }
        nr += dr;
        nc += dc;
      }
    }
  }
  return -1;
}

/**
 * @param {number[]} source
 * @param {number[]} target
 * @return {number}
 */
var minQueenMoves = function(source, target) {
  const [sr, sc] = source;
  const [tr, tc] = target;
  if (sr === tr && sc === tc) return 0;
  if (sr === tr || sc === tc || Math.abs(sr - tr) === Math.abs(sc - tc)) return 1;
  return 2;
};

let tested = 0;
let mismatches = 0;

for (let r1 = 1; r1 <= 8; r1++) {
  for (let c1 = 1; c1 <= 8; c1++) {
    for (let r2 = 1; r2 <= 8; r2++) {
      for (let c2 = 1; c2 <= 8; c2++) {
        const expected = bfsQueen(r1, c1, r2, c2);
        const actual = minQueenMoves([r1, c1], [r2, c2]);
        tested++;
        if (expected !== actual) {
          console.error(`Mismatch at [${r1},${c1}] -> [${r2},${c2}]: expected ${expected}, got ${actual}`);
          mismatches++;
        }
      }
    }
  }
}

console.log(`Stress test completed: tested ${tested} pairs, mismatches: ${mismatches}`);
