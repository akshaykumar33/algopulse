const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const chains = [];
  const tails = [];

  for (let i = 0; i < n; i++) {
    const x = Number(input[1 + i]);

    let low = 0;
    let high = tails.length - 1;
    let best = -1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (tails[mid] < x) {
        best = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    if (best === -1) {
      tails.push(x);
      chains.push([x]);
    } else {
      tails[best] = x;
      chains[best].push(x);
    }
  }

  const out = [];
  for (let i = 0; i < chains.length; i++) {
    out.push(chains[i].join(' '));
  }

  console.log(out.join('\n'));
}

solve();
