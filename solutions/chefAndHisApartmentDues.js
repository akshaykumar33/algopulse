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
    
    let unpaid = 0;
    let firstZero = -1;
    for (let i = 0; i < n; i++) {
      if (arr[i] === 0) {
        unpaid++;
        if (firstZero === -1) firstZero = i;
      }
    }
    
    let ans = 0;
    if (unpaid > 0) {
      ans = unpaid * 1000 + (n - firstZero) * 100;
    }
    out.push(ans);
  }
  
  console.log(out.join('\n'));
}

solve();
