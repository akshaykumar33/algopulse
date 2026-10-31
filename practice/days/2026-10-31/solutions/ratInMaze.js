const fs = require('fs');

function findAllPaths(n, grid) {
  if (!grid || n === 0 || grid[0][0] === 0 || grid[n - 1][n - 1] === 0) return [];
  const vis = Array.from({ length: n }, () => new Array(n).fill(false));
  const paths = [];

  const moves = [
    { dir: 'D', dr: 1, dc: 0 },
    { dir: 'L', dr: 0, dc: -1 },
    { dir: 'R', dr: 0, dc: 1 },
    { dir: 'U', dr: -1, dc: 0 },
  ];

  function dfs(r, c, path) {
    if (r === n - 1 && c === n - 1) {
      paths.push(path);
      return;
    }
    vis[r][c] = true;
    for (const m of moves) {
      const nr = r + m.dr;
      const nc = c + m.dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc] && grid[nr][nc] === 1) {
        dfs(nr, nc, path + m.dir);
      }
    }
    vis[r][c] = false;
  }

  dfs(0, 0, '');
  paths.sort();
  return paths;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push(parseInt(tokens[ptr++], 10));
      }
      grid.push(row);
    }

    const paths = findAllPaths(n, grid);
    if (paths.length === 0) {
      out.push('-1');
    } else {
      out.push(`[ ${paths.map((p) => `"${p}"`).join(', ')} ]`);
    }
  }

  console.log(out.join('\n'));
}

if (typeof require !== 'undefined' && require.main === module) {
  solve();
}

if (typeof module !== 'undefined') {
  module.exports = { findAllPaths };
}
