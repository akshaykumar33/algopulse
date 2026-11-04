const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;

  const firstParts = input[lineIdx++].trim().split(/\s+/);
  const x = parseInt(firstParts[0], 10);
  const y = parseInt(firstParts[1], 10);

  const grid = [];
  for (let r = 0; r < x; r++) {
    grid.push(input[lineIdx++].trim());
  }

  const visited = new Uint8Array(x * y);
  const queue = new Int32Array(x * y);
  let qHead = 0;
  let qTail = 0;

  for (let r = 0; r < x; r++) {
    for (let c = 0; c < y; c++) {
      if (r === 0 || r === x - 1 || c === 0 || c === y - 1) {
        if (grid[r][c] === '.') {
          const idx = r * y + c;
          if (visited[idx] === 0) {
            visited[idx] = 1;
            queue[qTail++] = idx;
          }
        }
      }
    }
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  while (qHead < qTail) {
    const curr = queue[qHead++];
    const r = Math.floor(curr / y);
    const c = curr % y;

    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k];
      const nc = c + dc[k];
      if (nr >= 0 && nr < x && nc >= 0 && nc < y) {
        if (grid[nr][nc] === '.') {
          const nidx = nr * y + nc;
          if (visited[nidx] === 0) {
            visited[nidx] = 1;
            queue[qTail++] = nidx;
          }
        }
      }
    }
  }

  let hasVoid = false;
  for (let r = 0; r < x; r++) {
    for (let c = 0; c < y; c++) {
      if (grid[r][c] === '.' && visited[r * y + c] === 0) {
        hasVoid = true;
        break;
      }
    }
    if (hasVoid) break;
  }

  console.log(hasVoid ? 0 : 1);
}

solve();

