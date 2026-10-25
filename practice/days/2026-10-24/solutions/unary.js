const fs = require('fs');

function solve() {
  const line = fs.readFileSync(0, 'utf-8').trim();
  if (!line) return;
  const map = {
    '>': 8,
    '<': 9,
    '+': 10,
    '-': 11,
    '.': 12,
    ',': 13,
    '[': 14,
    ']': 15,
  };
  const MOD = 1000003;
  let ans = 0;
  for (let i = 0; i < line.length; i++) {
    const val = map[line[i]];
    if (val !== undefined) {
      ans = (ans * 16 + val) % MOD;
    }
  }
  console.log(ans);
}

solve();
