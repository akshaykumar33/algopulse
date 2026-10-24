var pacificAtlantic = function(heights) {
  if (!heights || heights.length === 0 || heights[0].length === 0) return [];
  const m = heights.length;
  const n = heights[0].length;
  const pac = Array.from({ length: m }, () => new Uint8Array(n));
  const atl = Array.from({ length: m }, () => new Uint8Array(n));

  function bfs(queue, visited) {
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let head = 0;
    while (head < queue.length) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          visited[nr][nc] = 1;
          queue.push([nr, nc]);
        }
      }
    }
  }

  const pacQ = [];
  const atlQ = [];

  for (let r = 0; r < m; r++) {
    pac[r][0] = 1;
    pacQ.push([r, 0]);
    atl[r][n - 1] = 1;
    atlQ.push([r, n - 1]);
  }

  for (let c = 0; c < n; c++) {
    if (!pac[0][c]) {
      pac[0][c] = 1;
      pacQ.push([0, c]);
    }
    if (!atl[m - 1][c]) {
      atl[m - 1][c] = 1;
      atlQ.push([m - 1, c]);
    }
  }

  bfs(pacQ, pac);
  bfs(atlQ, atl);

  const res = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) {
        res.push([r, c]);
      }
    }
  }

  return res;
};

var solve = pacificAtlantic;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
