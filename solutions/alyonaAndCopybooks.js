const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  const a = parseInt(tokens[1], 10);
  const b = parseInt(tokens[2], 10);
  const c = parseInt(tokens[3], 10);

  let minCost = Infinity;

  for (let x = 0; x <= 4; x++) {
    for (let y = 0; y <= 4; y++) {
      for (let z = 0; z <= 4; z++) {
        const k = x + 2 * y + 3 * z;
        if ((n + k) % 4 === 0) {
          const cost = x * a + y * b + z * c;
          if (cost < minCost) {
            minCost = cost;
          }
        }
      }
    }
  }

  console.log(minCost);
}

solve();

