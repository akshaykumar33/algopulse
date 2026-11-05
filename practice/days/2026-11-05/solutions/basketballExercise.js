const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const h1 = new Float64Array(n);
  for (let i = 0; i < n; i++) h1[i] = parseInt(input[ptr++], 10);
  const h2 = new Float64Array(n);
  for (let i = 0; i < n; i++) h2[i] = parseInt(input[ptr++], 10);

  let dp0 = 0;
  let dp1 = 0;

  for (let i = 0; i < n; i++) {
    const next0 = Math.max(dp0, dp1 + h1[i]);
    const next1 = Math.max(dp1, dp0 + h2[i]);
    dp0 = next0;
    dp1 = next1;
  }

  console.log(Math.max(dp0, dp1));
}

solve();
