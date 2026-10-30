const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);

  const color = new Int32Array(n + 1);
  let curColor = 0;

  for (let i = 2; i <= n; i++) {
    if (color[i] === 0) {
      curColor++;
      for (let j = i; j <= n; j += i) {
        if (color[j] === 0) color[j] = curColor;
      }
    }
  }

  const out = [];
  for (let i = 2; i <= n; i++) {
    out.push(color[i]);
  }
  console.log(out.join(' '));
}

solve();
