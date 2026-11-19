const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    let totalWork = 0;
    let currentFlow = 0;
    for (let i = 0; i < n; i++) {
      const d = parseInt(input[ptr++], 10);
      currentFlow += d;
      if (i < n - 1) {
        totalWork += Math.abs(currentFlow);
      }
    }
    out.push(totalWork);
  }

  console.log(out.join('\n'));
}

solve();
