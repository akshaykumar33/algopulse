const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += parseInt(tokens[ptr++], 10);
  }
  console.log(Math.max(n, Math.floor((sum + 1) / 2)));
}

solve();
