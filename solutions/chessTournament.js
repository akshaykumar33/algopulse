const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(lines[idx++], 10);
    const s = lines[idx++];

    const twos = [];
    for (let i = 0; i < n; i++) {
      if (s[i] === '2') twos.push(i);
    }

    if (twos.length === 1 || twos.length === 2) {
      out.push('NO');
      continue;
    }

    const grid = Array.from({ length: n }, () => Array(n).fill('='));
    for (let i = 0; i < n; i++) {
      grid[i][i] = 'X';
    }

    const sz = twos.length;
    for (let i = 0; i < sz; i++) {
      const u = twos[i];
      const v = twos[(i + 1) % sz];
      grid[u][v] = '+';
      grid[v][u] = '-';
    }

    out.push('YES');
    for (let i = 0; i < n; i++) {
      out.push(grid[i].join(''));
    }
  }

  console.log(out.join('\n'));
}

solve();
