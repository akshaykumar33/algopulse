var highestRankedKItems = function(grid, pricing, start, k) {
  const m = grid.length;
  const n = grid[0].length;
  const [low, high] = pricing;
  const [startR, startC] = start;

  const dist = Array.from({ length: m }, () => new Int32Array(n).fill(-1));
  const queue = [[startR, startC]];
  dist[startR][startC] = 0;

  const items = [];
  let head = 0;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (head < queue.length) {
    const [r, c] = queue[head++];
    const p = grid[r][c];

    if (p >= low && p <= high && p > 1) {
      items.push({ d: dist[r][c], price: p, r, c });
    }

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] !== 0 && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  items.sort((a, b) => a.d - b.d || a.price - b.price || a.r - b.r || a.c - b.c);
  return items.slice(0, k).map(item => [item.r, item.c]);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 4) {
      console.log(JSON.stringify(highestRankedKItems(JSON.parse(lines[i]), JSON.parse(lines[i + 1]), JSON.parse(lines[i + 2]), JSON.parse(lines[i + 3]))));
    }
  }
}

module.exports = highestRankedKItems;
