const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const reported = new Uint8Array(n + 1);

  for (let i = 0; i < n; i++) {
    const parent = parseInt(input[ptr++], 10);
    if (parent <= n) {
      reported[parent] = 1;
    }
  }

  const ans = [];
  for (let i = 1; i <= n; i++) {
    if (reported[i] === 0) {
      ans.push(i);
    }
  }

  console.log(ans.join(' '));
}

solve();

