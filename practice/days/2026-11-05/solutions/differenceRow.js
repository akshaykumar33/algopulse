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
  arr.sort((a, b) => a - b);
  const maxVal = arr.pop();
  const minVal = arr.shift();
  arr.sort((a, b) => b - a);
  const ans = [maxVal, ...arr, minVal];
  console.log(ans.join(' '));
}
solve();
