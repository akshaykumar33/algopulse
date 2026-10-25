var nearestExit = function(maze, entrance) {
  let m = maze.length;
  let n = maze[0].length;
  let q = [[entrance[0], entrance[1], 0]];
  maze[entrance[0]][entrance[1]] = '+';
  let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let head = 0;
  while (head < q.length) {
    let [r, c, d] = q[head++];
    for (let [dr, dc] of dirs) {
      let nr = r + dr;
      let nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && maze[nr][nc] === '.') {
        if (nr === 0 || nr === m - 1 || nc === 0 || nc === n - 1) {
          return d + 1;
        }
        maze[nr][nc] = '+';
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return -1;
};

var solve = nearestExit;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const maze = JSON.parse(lines[i]);
        const entrance = JSON.parse(lines[i + 1]);
        const result = solve(maze, entrance);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = nearestExit;
