const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const pos = Array.from({ length: n + 1 }, () => []);

  for (let i = 1; i <= 2 * n; i++) {
    const val = parseInt(tokens[ptr++], 10);
    pos[val].push(i);
  }

  let p1 = 1;
  let p2 = 1;
  let ans = 0;

  for (let i = 1; i <= n; i++) {
    const [c1, c2] = pos[i];
    ans += Math.abs(c1 - p1) + Math.abs(c2 - p2);
    p1 = c1;
    p2 = c2;
  }

  console.log(ans);
}

solve();
