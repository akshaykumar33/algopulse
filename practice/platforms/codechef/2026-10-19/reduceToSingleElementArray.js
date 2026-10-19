function canReduce(N, arr) {
  if (N <= 1) return true;
  const vals = Array.from(new Set(arr)).sort((a, b) => a - b);
  for (let i = 0; i < vals.length - 1; i++) {
    if (vals[i + 1] - vals[i] > 1) {
      return false;
    }
  }
  return true;
}

function solve() {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  while (ptr < input.length) {
    const n = parseInt(input[ptr++], 10);
    if (isNaN(n)) break;
    const arr = [];
    for (let i = 0; i < n && ptr < input.length; i++) {
      arr.push(parseInt(input[ptr++], 10));
    }
    const res = canReduce(n, arr);
    console.log(res ? 'YES' : 'NO');
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  solve();
}

if (typeof module !== 'undefined') {
  module.exports = { canReduce, solve };
}
