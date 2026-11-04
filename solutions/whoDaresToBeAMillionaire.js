const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const correct = input[ptr++];
    const chef = input[ptr++];

    let c = 0;
    for (let i = 0; i < n; i++) {
      if (correct[i] === chef[i]) {
        c++;
      }
    }

    const w = new Float64Array(n + 1);
    for (let i = 0; i <= n; i++) {
      w[i] = parseFloat(input[ptr++]);
    }

    if (c === n) {
      out.push(w[n]);
    } else {
      let maxPrize = w[0];
      for (let i = 1; i <= c; i++) {
        if (w[i] > maxPrize) {
          maxPrize = w[i];
        }
      }
      out.push(maxPrize);
    }
  }

  console.log(out.join('\n'));
}

solve();
