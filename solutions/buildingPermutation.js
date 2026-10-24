const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  
  const n = parseInt(input[0], 10);
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(parseInt(input[i], 10));
  }
  
  arr.sort((a, b) => a - b);
  
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += Math.abs(arr[i] - (i + 1));
  }
  
  console.log(ans);
}

solve();
