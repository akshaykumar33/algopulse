const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;

  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const minCost = new Array(m + 1).fill(Infinity);
  for (let i = 0; i < n; i++) {
    const r = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);
    if (c < minCost[r]) {
      minCost[r] = c;
    }
  }

  let total = 0;
  for (let r = 1; r <= m; r++) {
    if (minCost[r] !== Infinity) {
      total += minCost[r];
    }
  }

  console.log(Math.min(total, k));
}

solve();

