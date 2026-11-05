const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(parseInt(tokens[ptr++], 10));
  }

  function removeFactors(x) {
    while (x % 2 === 0) x /= 2;
    while (x % 3 === 0) x /= 3;
    return x;
  }

  const base = removeFactors(arr[0]);
  for (let i = 1; i < n; i++) {
    if (removeFactors(arr[i]) !== base) {
      console.log('No');
      return;
    }
  }
  console.log('Yes');
}

solve();
