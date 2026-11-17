var countUnguarded = function(m, n, guards, walls) {
  const grid = new Uint8Array(m * n);

  for (let i = 0; i < guards.length; i++) {
    grid[guards[i][0] * n + guards[i][1]] = 1;
  }
  for (let i = 0; i < walls.length; i++) {
    grid[walls[i][0] * n + walls[i][1]] = 2;
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let i = 0; i < guards.length; i++) {
    const gr = guards[i][0];
    const gc = guards[i][1];

    for (let d = 0; d < 4; d++) {
      let r = gr + dr[d];
      let c = gc + dc[d];
      while (r >= 0 && r < m && c >= 0 && c < n) {
        const idx = r * n + c;
        if (grid[idx] === 1 || grid[idx] === 2) break;
        grid[idx] = 3;
        r += dr[d];
        c += dc[d];
      }
    }
  }

  let unguarded = 0;
  for (let i = 0; i < m * n; i++) {
    if (grid[i] === 0) unguarded++;
  }
  return unguarded;
};

var solve = countUnguarded;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
