const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const m = parseInt(tokens[ptr++], 10);
  const adj = Array.from({ length: 6 }, () => new Uint8Array(6));

  for (let i = 0; i < m; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    adj[u][v] = 1;
    adj[v][u] = 1;
  }

  let win = false;
  for (let i = 1; i <= 5; i++) {
    for (let j = i + 1; j <= 5; j++) {
      for (let k = j + 1; k <= 5; k++) {
        const friends = adj[i][j] && adj[j][k] && adj[i][k];
        const strangers = !adj[i][j] && !adj[j][k] && !adj[i][k];
        if (friends || strangers) {
          win = true;
          break;
        }
      }
      if (win) break;
    }
    if (win) break;
  }

  console.log(win ? 'WIN' : 'FAIL');
}

solve();

