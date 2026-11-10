const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;
  let ptr = 0;
  const k = parseInt(input[ptr++], 10);
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const grid = [];
  for (let l = 0; l < k; l++) {
    const layer = [];
    for (let r = 0; r < n; r++) {
      layer.push(input[ptr++]);
    }
    grid.push(layer);
  }

  const sx = parseInt(input[ptr++], 10) - 1;
  const sy = parseInt(input[ptr++], 10) - 1;

  const vis = Array.from({ length: k }, () =>
    Array.from({ length: n }, () => new Uint8Array(m))
  );

  const qL = [];
  const qR = [];
  const qC = [];

  let qHead = 0;
  if (grid[0][sx][sy] === '.') {
    vis[0][sx][sy] = 1;
    qL.push(0);
    qR.push(sx);
    qC.push(sy);
  }

  const dl = [1, -1, 0, 0, 0, 0];
  const dr = [0, 0, 1, -1, 0, 0];
  const dc = [0, 0, 0, 0, 1, -1];

  let count = 0;
  while (qHead < qL.length) {
    const cl = qL[qHead];
    const cr = qR[qHead];
    const cc = qC[qHead];
    qHead++;
    count++;

    for (let d = 0; d < 6; d++) {
      const nl = cl + dl[d];
      const nr = cr + dr[d];
      const nc = cc + dc[d];
      if (
        nl >= 0 &&
        nl < k &&
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < m &&
        grid[nl][nr][nc] === '.' &&
        vis[nl][nr][nc] === 0
      ) {
        vis[nl][nr][nc] = 1;
        qL.push(nl);
        qR.push(nr);
        qC.push(nc);
      }
    }
  }

  console.log(count);
}

solve();

