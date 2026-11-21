const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const grid = [];
  let sr = -1, sc = -1, tr = -1, tc = -1;
  for (let i = 0; i < n; i++) {
    const row = input[ptr++];
    grid.push(row);
    for (let j = 0; j < m; j++) {
      if (row[j] === 'S') { sr = i; sc = j; }
      else if (row[j] === 'T') { tr = i; tc = j; }
    }
  }

  const INF = 100;
  const dist = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => new Array(4).fill(INF))
  );

  const maxQueueSize = n * m * 4 + 10;
  const qR = new Int32Array(maxQueueSize);
  const qC = new Int32Array(maxQueueSize);
  const qD = new Int32Array(maxQueueSize);
  let qh = 0, qt = 0;

  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  for (let d = 0; d < 4; d++) {
    dist[sr][sc][d] = 0;
    qR[qt] = sr; qC[qt] = sc; qD[qt++] = d;
  }

  while (qh < qt) {
    const r = qR[qh], c = qC[qh], d = qD[qh++];
    const curTurns = dist[r][c][d];

    if (r === tr && c === tc && curTurns <= 2) {
      console.log('YES');
      return;
    }

    // Move straight
    const nr = r + dr[d], nc = c + dc[d];
    if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] !== '*') {
      if (curTurns < dist[nr][nc][d]) {
        dist[nr][nc][d] = curTurns;
        qR[qt] = nr; qC[qt] = nc; qD[qt++] = d;
      }
    }

    // Turn
    if (curTurns < 2) {
      for (let nd = 0; nd < 4; nd++) {
        if (nd !== d) { // It's a turn, so direction must change
          // Turning doesn't change position
          if (curTurns + 1 < dist[r][c][nd]) {
            dist[r][c][nd] = curTurns + 1;
            qR[qt] = r; qC[qt] = c; qD[qt++] = nd;
          }
        }
      }
    }
  }

  for (let d = 0; d < 4; d++) {
    if (dist[tr][tc][d] <= 2) {
      console.log('YES');
      return;
    }
  }

  console.log('NO');
}
solve();
