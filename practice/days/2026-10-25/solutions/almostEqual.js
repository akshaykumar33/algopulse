const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  
  if (n % 2 === 0) {
    console.log("NO");
    return;
  }
  
  const ans = new Array(2 * n);
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      ans[i] = 2 * i + 1;
      ans[i + n] = 2 * i + 2;
    } else {
      ans[i] = 2 * i + 2;
      ans[i + n] = 2 * i + 1;
    }
  }
  
  console.log("YES");
  console.log(ans.join(" "));
}

solve();
