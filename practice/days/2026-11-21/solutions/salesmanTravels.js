const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  const isValid = (u, v, K) => {
    const prod = u * v;
    const sq = Math.round(Math.sqrt(prod));
    if (sq >= 1 && Math.abs(prod - sq * sq) <= K) return true;
    if (sq > 1 && Math.abs(prod - (sq - 1) * (sq - 1)) <= K) return true;
    if (Math.abs(prod - (sq + 1) * (sq + 1)) <= K) return true;
    return false;
  };

  const solveCase = (N, K) => {
    if (N === 1) return [1];
    const adj = Array.from({ length: N + 1 }, () => []);
    for (let i = 1; i <= N; i++) {
      for (let j = i + 1; j <= N; j++) {
        if (isValid(i, j, K)) {
          adj[i].push(j);
          adj[j].push(i);
        }
      }
    }

    const used = new Uint8Array(N + 1);
    const pairs = [];
    const target = Math.floor(N / 2);

    const backtrack = (count) => {
      if (count === target) return true;
      let bestV = -1, minDeg = 1e9;
      for (let i = 1; i <= N; i++) {
        if (!used[i]) {
          let deg = 0;
          for (let k = 0; k < adj[i].length; k++) if (!used[adj[i][k]]) deg++;
          if (deg < minDeg) {
            minDeg = deg;
            bestV = i;
          }
        }
      }
      if (bestV === -1 || minDeg === 0) return false;

      used[bestV] = 1;
      const nbs = [];
      for (let k = 0; k < adj[bestV].length; k++) {
        const nb = adj[bestV][k];
        if (!used[nb]) nbs.push(nb);
      }
      nbs.sort((a, b) => {
        let da = 0, db = 0;
        for (let k = 0; k < adj[a].length; k++) if (!used[adj[a][k]]) da++;
        for (let k = 0; k < adj[b].length; k++) if (!used[adj[b][k]]) db++;
        return da - db;
      });

      for (let k = 0; k < nbs.length; k++) {
        const nb = nbs[k];
        used[nb] = 1;
        pairs.push([bestV, nb]);
        if (backtrack(count + 1)) return true;
        pairs.pop();
        used[nb] = 0;
      }
      used[bestV] = 0;
      return false;
    };

    if (N % 2 === 1) {
      for (let skip = 1; skip <= N; skip++) {
        used.fill(0);
        used[skip] = 1;
        pairs.length = 0;
        if (backtrack(0)) {
          const res = [];
          for (let k = 0; k < pairs.length; k++) res.push(pairs[k][0], pairs[k][1]);
          res.push(skip);
          return res;
        }
      }
      return -1;
    } else {
      used.fill(0);
      pairs.length = 0;
      if (backtrack(0)) {
        const res = [];
        for (let k = 0; k < pairs.length; k++) res.push(pairs[k][0], pairs[k][1]);
        return res;
      }
      return -1;
    }
  };

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const res = solveCase(n, k);
    out.push(Array.isArray(res) ? res.join(' ') : -1);
  }
  console.log(out.join('\n'));
}
solve();