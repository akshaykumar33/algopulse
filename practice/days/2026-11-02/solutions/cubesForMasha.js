const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const cubes = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < 6; j++) {
      row.push(parseInt(tokens[ptr++], 10));
    }
    cubes.push(row);
  }

  const possible = new Set();
  const used = new Array(n).fill(false);

  function dfs(cur) {
    if (cur.length > 0) {
      possible.add(parseInt(cur, 10));
    }
    if (cur.length === n) return;

    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        for (let j = 0; j < 6; j++) {
          dfs(cur + cubes[i][j]);
        }
        used[i] = false;
      }
    }
  }

  dfs('');

  let ans = 1;
  while (possible.has(ans)) {
    ans++;
  }

  console.log(ans - 1);
}

solve();

