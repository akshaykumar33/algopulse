const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }

    let minRemove = n;

    for (let k = 0; k <= 30; k++) { // Max value of arr[i] is 10^9 < 2^30. So k up to 30 is sufficient.
      const targetMaxVal = (1 << k) - 1; // All bits up to k-1 are set
      let currentRemovals = 0;
      let currentOR = 0;
      for (let i = 0; i < n; i++) {
        if ((arr[i] & targetMaxVal) === arr[i]) { // if arr[i] has no bits set >= k
          currentOR |= arr[i];
        } else {
          currentRemovals++;
        }
      }
      // If after removing elements that have bits >= k, the remaining elements' OR is targetMaxVal
      if (currentOR === targetMaxVal) {
        if (currentRemovals < minRemove) {
          minRemove = currentRemovals;
        }
      }
    }

    out.push(minRemove);
  }

  console.log(out.join('\n'));
}

solve();
