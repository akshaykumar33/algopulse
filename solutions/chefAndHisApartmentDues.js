const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || lines[0] === '') return;
  
  let t = parseInt(lines[0], 10);
  let lineIdx = 1;
  let out = [];
  
  while (t--) {
    let n = parseInt(lines[lineIdx++], 10);
    let arr = lines[lineIdx++].split(' ').map(Number);
    
    let zeros = 0;
    for (let i = 0; i < n; i++) {
      if (arr[i] === 0) {
        zeros++;
      }
    }
    
    let ans = zeros * 1100 + (zeros > 0 ? n * 100 : 0);
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();
