const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const t = parseInt(input[0], 10);
  let s = parseInt(input[1], 10);
  const q = parseInt(input[2], 10);

  let restarts = 0;
  while (s < t) {
    restarts++;
    s *= q;
  }
  console.log(restarts);
}

solve();
