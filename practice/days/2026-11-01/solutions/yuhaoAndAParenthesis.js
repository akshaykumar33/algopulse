const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);

  const countMap = new Map();
  let ans = 0;

  for (let i = 0; i < n; i++) {
    const s = tokens[ptr++];
    let minBal = 0;
    let bal = 0;
    for (let j = 0; j < s.length; j++) {
      if (s[j] === '(') {
        bal++;
      } else {
        bal--;
      }
      if (bal < minBal) {
        minBal = bal;
      }
    }

    if (minBal >= 0) {
      if (!countMap.has(bal)) {
        countMap.set(bal, [0, 0]);
      }
      countMap.get(bal)[0]++;
    } else if (minBal === bal) {
      const needed = -bal;
      if (!countMap.has(needed)) {
        countMap.set(needed, [0, 0]);
      }
      countMap.get(needed)[1]++;
    }
  }

  for (const [k, v] of countMap.entries()) {
    if (k === 0) {
      ans += Math.floor(v[0] / 2);
    } else {
      ans += Math.min(v[0], v[1]);
    }
  }

  console.log(ans);
}

solve();
