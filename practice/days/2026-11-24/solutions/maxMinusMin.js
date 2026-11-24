const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let j = 0; j < n; j++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }

    arr.sort((a, b) => a - b);

    if (n === 0) {
      out.push(0);
    } else if (n === 1) {
      out.push(0);
    } else {
      out.push(arr[n - 1] - arr[0]);
    }
  }

  console.log(out.join('\n'));
}

solve();
